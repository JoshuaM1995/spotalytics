import React, {useContext, useEffect, useState} from 'react';
import {getIsoCountries} from "../../../utils/global";
import {FlexboxGrid, List, Panel, PanelGroup, Placeholder, Progress} from "rsuite";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import {Link} from "react-router-dom";

const isoCountries = getIsoCountries();

interface TopTracksProps {
  artistId: string;
  active: boolean;
}

// function filterByCountryCode(item: any) {
//   return item.country_code === this;
// }

const ArtistTopTracks = ({artistId, active}: TopTracksProps) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksFetched, setTopTracksFetched] = useState<Set<string>>(new Set([]));
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    console.log('top tracks', topTracks);
  }, [topTracks]);

  const getTopTracks = (countryCode: string) => {
    const topTracksFetchedSet: Set<string> = topTracksFetched;

    // Make sure top tracks aren't fetched more than once
    if (!topTracksFetchedSet.has(countryCode)) {
      topTracksFetchedSet.add(countryCode);
      setTopTracksFetched(topTracksFetchedSet);

      spotifyApi.getTopTracksByCountry(artistId, countryCode).then((tracks) => {
        tracks.map((track: any) => {
          track.country_code = countryCode;
        });
        setTopTracks(tracks);
      });
    }

    return topTracks;
  };

  if (active) {
    return (
      <PanelGroup accordion bordered>
        {Object.keys(isoCountries).map((countryCode, index) => {
          const countryName = getIsoCountries()[countryCode];

          return (
            <Panel
              key={countryCode}
              header={countryName}
              eventKey={index + 1}
              onClick={() => getTopTracks(countryCode)}
            >
              <List hover>
                {topTracks?.filter((item: any) => {
                  return item.country_code === countryCode
                })
                  .map((track: any, index: number) => {
                    console.log('track', track);
                    return (
                      <List.Item key={track.name} index={index}>
                        <FlexboxGrid>
                          <FlexboxGrid.Item colspan={2} className="center" style={{height: '60px'}}>
                            <Link to={`/album/${track.album.id}`}>
                              <img src={track.album.images[0].url} height={50} width={50} alt={track.album.name}/>
                            </Link>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                            colspan={6}
                            className="center"
                            style={{
                              height: '60px',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              overflow: 'hidden',
                            }}
                          >
                            <div className="track-name">
                              <a href={track.uri}>{track.name}</a>
                            </div>
                            <div>
                              {track.album.name}
                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={6} className="center" style={{height: '60px'}}>
                            <div style={{textAlign: 'right'}}>
                              <div className="text-slim">Popularity</div>
                              <Progress.Line percent={track.popularity} showInfo={false}/>
                            </div>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </List.Item>
                    )
                  })}
              </List>
            </Panel>
          );
        })}
      </PanelGroup>
    );
  } else {
    return <></>;
  }
};

export default ArtistTopTracks;
