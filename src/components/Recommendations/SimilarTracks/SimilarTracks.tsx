import React, { useContext, useState } from 'react'
import { Icon, InputPicker } from 'rsuite';
import Page from '../../Page/Page';
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import _ from "lodash";

const SimilarTracks = () => {
  const [areTracksLoading, setAreTracksLoading] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const { spotifyContext } = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  const searchTracks = _.debounce(async (searchTerm: string) => {
    setAreTracksLoading(true);

    const response: any = await spotifyApi.searchData(searchTerm, ['track'], 10);
    const tracks = response.tracks?.items.map((track: any) => {
      return {
        value: track.id,
        label: `${track.name} - ${track.artists[0].name}`,
      }
    });
    setAreTracksLoading(false);
    setTracks(tracks ?? []);
  }, 200);

  const selectTrack = async (trackId: string) => {
    const response: any = await spotifyApi.getAudioFeatures(trackId);
    console.log('selectTrack response', response);

    // Remove metadata and only keep the track's features
    let recommendationOptions = _.omit(response, ['analysis_url', 'id', 'track_href', 'type', 'uri']);
    // Append "target_" to each key
    recommendationOptions = _.mapKeys(recommendationOptions, (value, key) => `target_${key}`);
    recommendationOptions = {
      ...recommendationOptions,
      ...{ seed_tracks: trackId, limit: 100 },
    };
    // TODO: Save these track recommendations in the state
    const trackRecommendations = await spotifyApi.getFilteredRecommendations(recommendationOptions);
    console.log('trackRecommendations', trackRecommendations);
  };

  return (
    <Page title="Similar Tracks">
      <h4>Enter a track and we will find similar tracks and create a playlist for you.</h4>
      <br />

      <InputPicker
        data={tracks}
        onSearch={(value) => searchTracks(value)}
        onSelect={selectTrack}
        loading={areTracksLoading}
        style={{ minWidth: '300px' }}
        renderMenu={menu => {
          if (areTracksLoading) {
            return (
              <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                <Icon icon="spinner" spin /> Loading...
              </p>
            );
          }
          return menu;
        }}
      />

      {/* TODO: Add header "Similar Tracks to Fearless - Pyramaze" */}
      {/* TODO: Add table with tracks and allow the user to save to a playlist, similar to on the recommendations page */}
    </Page>
  );
};

export default SimilarTracks;