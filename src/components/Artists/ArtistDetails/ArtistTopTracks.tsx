import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlexboxGrid, List, PanelGroup, Placeholder, Progress, SelectPicker} from "rsuite";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import {Link} from "react-router-dom";
import {getProgressLineProps} from "../../../utils/progress";
import {isoCountries, placeholderItems} from "../../../utils/global";

interface TopTracksProps {
  artistId: string;
  active: boolean;
}

const ArtistTopTracks = ({artistId, active}: TopTracksProps) => {
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [topTracksFetched, setTopTracksFetched] = useState<any[]>([]);
  const [countryCode, setCountryCode] = useState('');
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  const getTopTracks = useCallback((countryCode: string) => {
    let countryCodeExistsInFetchedTracks = false;

    for(let i = 0; i < topTracksFetched.length; i++) {
      const tracksFetched = topTracksFetched[i];

      for(let j = 0; j < tracksFetched.length; j++) {
        const track = tracksFetched[j];

        if(track.country_code === countryCode) {
          countryCodeExistsInFetchedTracks = true;
          break;
        }
      }
    }

    // If the top tracks for the selected country code hasn't already been selected, fetch the top tracks
    // using that country code; otherwise, use what has been "cached" in the state
    if (!countryCodeExistsInFetchedTracks) {
      spotifyApi.getTopTracksByCountry(artistId, countryCode).then((tracks) => {
        tracks.map((track: any) => {
          return {
            ...track,
            'country_code': countryCode,
          };
        });
        setTopTracks(tracks);
        setTopTracksFetched([ ...topTracksFetched, tracks ]);
      });
    } else {
      topTracksFetched.forEach((tracks: any[]) => {
        const topTracksByCountry = tracks.filter((track: any) => {
          return track.country_code === countryCode;
        });

        if(topTracksByCountry.length > 0) {
          setTopTracks(topTracksByCountry);
        }
      });
    }

    return topTracks;
  }, [artistId, spotifyApi, topTracks, topTracksFetched]);

  useEffect(() => {
    // Only load the related artists when the tab becomes active, and if they haven't already been loaded
    if(active && topTracks.length === 0) {
      // Get the top tracks based on the user's country code
      getTopTracks(spotifyContext.currentUser?.country ?? 'US');
      setCountryCode(spotifyContext.currentUser?.country ?? 'US');
    }
  }, [active, spotifyContext.currentUser, topTracks.length, getTopTracks]);

  useEffect(() => {
    if(countryCode) {
      getTopTracks(countryCode);
    }
  }, [countryCode, getTopTracks]);

  const changeCountry = (country: string) => {
    setCountryCode(country);
  };

  if (active) {
    return (
      <>
        <SelectPicker
          value={countryCode}
          placeholder="Select Country"
          data={isoCountries}
          style={{ width: 224, marginTop: 8, marginBottom: 8 }}
          onChange={changeCountry}
        />
        <PanelGroup accordion bordered>
          {topTracks.length === 0 &&
          <List>
            {placeholderItems(10).map((num) => (
              <List.Item key={num}>
                <Placeholder.Paragraph active style={{marginLeft: 20, marginTop: 10}} graph="image"/>
              </List.Item>
            ))}
          </List>}
          <List hover>
            {topTracks?.map((track: any, index: number) => (
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
                          <Progress.Line
                            percent={track.popularity}
                            showInfo={false}
                            {...getProgressLineProps(track.popularity)}
                          />
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                )
              )}
          </List>
        </PanelGroup>
      </>
    );
  } else {
    return <></>;
  }
};

export default ArtistTopTracks;
