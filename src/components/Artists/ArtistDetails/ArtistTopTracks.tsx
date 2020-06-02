import React, {useContext, useEffect, useState} from 'react';
import {FlexboxGrid, List, PanelGroup, Placeholder, Progress} from "rsuite";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import {Link} from "react-router-dom";
import axios, {AxiosResponse} from 'axios';
import {getProgressLineProps} from "../../../utils/progress";
import {placeholderItems} from "../../../utils/global";

interface TopTracksProps {
  artistId: string;
  active: boolean;
}

const ArtistTopTracks = ({artistId, active}: TopTracksProps) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksFetched, setTopTracksFetched] = useState<Set<string>>(new Set([]));
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    // Only load the related artists when the tab becomes active, and if they haven't already been loaded
    if(active && topTracks.length === 0) {
      // Get the top tracks based on the user's country code
      axios.get('https://geolocation-db.com/json/').then((response: AxiosResponse) => {
        getTopTracks(response.data.country_code);
      });
    }
  }, [active]);

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
        {topTracks.length === 0 &&
        <List>
          {placeholderItems(10).map((num) => (
            <List.Item key={num}>
              <Placeholder.Paragraph active style={{marginLeft: 20, marginTop: 10}} graph="square"/>
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
    );
  } else {
    return <></>;
  }
};

export default ArtistTopTracks;
