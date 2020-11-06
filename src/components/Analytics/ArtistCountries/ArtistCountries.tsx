import React, {useContext, useEffect, useState} from 'react';
import {ResponsiveChoropleth} from '@nivo/geo';
import artistCountriesFeatures from './artistCountriesFeatures';
import artistCountriesData from './artistCountriesData';
import './ArtistCountries.scss';
import {Container} from "rsuite";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import useAsyncEffect from "../../../hooks/useAsyncEffect";
import {alpha2to3} from 'iso3166-alpha-converter'
import axios from 'axios';

const mb = require('musicbrainz');

interface ArtistCountry {
  id: string;
  value: number;
}

const ArtistCountries = () => {
  const [artistCountries, setArtistCountries] = useState<string[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useAsyncEffect(async () => {
    // console.log('canada', alpha2to3['ca']);
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    const allFollowedArtists: any[] = await spotifyApi.getCurrentUserAllFollowedArtists();
    allFollowedArtists.forEach((artist) => {
    });
  }, []);

  useEffect(() => {
    // console.log('followedArtists', JSON.stringify(followedArtists));
  }, [artistCountries]);

  return (
    <Container className="analytics-container">
      <ResponsiveChoropleth
        data={artistCountriesData}
        features={artistCountriesFeatures}
        margin={{top: 0, right: 0, bottom: 0, left: 0}}
        colors="spectral"
        domain={[0, 1000000]}
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
      />
    </Container>
  );
};

export default ArtistCountries;
