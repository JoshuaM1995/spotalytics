import React, {useContext, useState} from 'react';
import {ResponsiveChoropleth} from '@nivo/geo';
import artistCountriesFeatures from './artistCountriesFeatures';
import {Container} from "rsuite";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import useAsyncEffect from "../../../hooks/useAsyncEffect";
import {alpha2to3} from 'iso3166-alpha-converter'
import axios from 'axios';
import {CacheKey} from "../../../utils/constants";
import * as _ from 'lodash';
import '../Analytics.scss';
import UnknownArtists from "./UnknownArtists";

const cache = require('localstorage-ttl');

interface ArtistCountry {
  id: string;
  value: number;
}

export interface UnknownArtist {
  artist: string;
}

const ArtistCountries = () => {
  const [artistCountriesData, setArtistCountriesData] = useState<ArtistCountry[]>([]);
  const [totalDomainCount, setTotalDomainCount] = useState(0);
  const [unknownArtists, setUnknownArtists] = useState<UnknownArtist[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useAsyncEffect(async () => {
    const artistCountriesDataCache: ArtistCountry[] = cache.get(CacheKey.ARTIST_COUNTRIES_DATA);
    const unknownArtistsDataCache: UnknownArtist[] = cache.get(CacheKey.UNKNOWN_ARTISTS);
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    if (!artistCountriesDataCache) {
      const promises: Promise<any>[] = [];

      const allFollowedArtists: any[] = await spotifyApi.getCurrentUserAllFollowedArtists();
      allFollowedArtists.forEach((artist) => {
        promises.push(axios.get(`https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${artist.name}`, {
          headers: null,
        }));
      });

      axios.all(promises).then(axios.spread((...responses: any) => {
        const artistCountries: { country: string }[] = [];
        const unknownArtists: UnknownArtist[] = [];

        responses.forEach((response: any) => {
          if (response.data.artists !== null) {
            if (response.data.artists[0].strCountryCode) {
              artistCountries.push({
                country: alpha2to3[response.data.artists[0].strCountryCode.toLowerCase()] ?? 'N/A',
              });
            } else {
              unknownArtists.push({ artist: response.data.artists[0].strArtist });
            }
          }
        });

        const artistCountriesNew: ArtistCountry[] = [];
        const countries = _.groupBy(artistCountries, 'country');
        _.forEach(countries, (value: any, key: any) => {
          artistCountriesNew.push({ id: key, value: value.length });
        });
        const artistWithMostCountries = _.sortBy(artistCountriesNew, 'value').reverse()[0];
        setTotalDomainCount(artistWithMostCountries.value);
        setArtistCountriesData(artistCountriesNew);
        setUnknownArtists(unknownArtists);
        cache.set(CacheKey.ARTIST_COUNTRIES_DATA, artistCountriesNew, 86400000);
        cache.set(CacheKey.UNKNOWN_ARTISTS, unknownArtists, 86400000);
      }));
    } else {
      const artistWithMostCountries = _.sortBy(artistCountriesDataCache, 'value').reverse()[0];
      setTotalDomainCount(artistWithMostCountries.value);
      setArtistCountriesData(artistCountriesDataCache);
      setUnknownArtists(unknownArtistsDataCache);
    }
  }, []);

  return (
    <Container className="analytics-container">
      <div style={{textAlign: 'center', margin: '15px 0 30px 0'}}>
        <h3>Artist's Countries</h3>
        <h5>Displays which countries have the most artists based on the artists you follow.</h5>
      </div>

      <ResponsiveChoropleth
        data={artistCountriesData}
        features={artistCountriesFeatures}
        margin={{top: 0, right: 0, bottom: 0, left: 0}}
        colors="spectral"
        domain={[0, totalDomainCount]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#152538"
        // @ts-ignore
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        tooltip={({ feature }: any) => {
          const { label, data, properties } = feature;

          return (
            <div className="nivo-tooltip">
              {data && <>{label}: {data.value} {data.value > 1 ? 'Artists' : 'Artist'}</>}
              {!data && <>{properties.name}: 0 Artists</>}
            </div>
          );
        }}
      />

      <UnknownArtists artists={unknownArtists} />
    </Container>
  );
};

export default ArtistCountries;
