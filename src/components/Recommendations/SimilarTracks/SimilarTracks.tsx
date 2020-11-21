import React, { useContext, useEffect, useReducer, useState } from 'react'
import { ControlLabel, FormGroup, Icon, InputPicker } from 'rsuite';
import Page from '../../Page/Page';
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import _ from "lodash";
import { RecommendedTrack } from '../../../utils/types';
import RecommendedTracksTable from '../RecommendationTable';
import tableReducer, { TableState } from '../../../reducers/tableReducer';
import { IS_LOADING, IS_NOT_LOADING } from '../../../actions/tableActions';
import moment from 'moment';
import { useParams } from 'react-router';
import useAsyncEffect from '../../../hooks/useAsyncEffect';

interface SimilarTracksParams {
  trackId?: string;
}

const initialTableState: TableState<RecommendedTrack> = {
  data: [],
  page: 1,
  displayLength: 100,
  isLoading: true,
};

const SimilarTracks = () => {
  const [areTracksLoading, setAreTracksLoading] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [seedTrackName, setSeedTrackName] = useState<string>();
  const [recommendedTracks, setRecommendedTracks] = useState<RecommendedTrack[]>([]);
  const [trackInfo, setTrackInfo] = useState<SpotifyApi.SingleTrackResponse>();
  const [trackCleared, setTrackCleared] = useState(false);
  const { spotifyContext } = useContext(SpotifyContext);
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
  const { trackId } = useParams<SimilarTracksParams>();

  useAsyncEffect(async () => {
    // If a track id is part of the route params, load that track information, select it, then display recommendations in the table
    if (trackId && !seedTrackName) {
      const trackInfo = await spotifyApi.getTrackInfo(trackId);
      setTrackInfo(trackInfo);

      setTracks([
        { value: trackId, label: trackInfo.name }
      ]);

      await selectTrack(trackId);
    }
  }, [trackId])

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
    tableStateDispatch({type: IS_LOADING});

    const response: any = await spotifyApi.getTrackFeatures(trackId);
    let track;

    // Don't use the pre-filled track info from the id in the url params if the track has been cleared
    if (trackCleared) {
      track = await spotifyApi.getTrackInfo(trackId);
    } else {
      track = trackInfo ?? await spotifyApi.getTrackInfo(trackId);
    }

    setSeedTrackName(`${track.name} by ${track.artists[0].name}`);

    // Remove metadata and only keep the track's features
    let recommendationOptions = _.omit(response, ['analysis_url', 'id', 'track_href', 'type', 'uri']);
    // Append "target_" to each key
    recommendationOptions = _.mapKeys(recommendationOptions, (value, key) => `target_${key}`);
    recommendationOptions = {
      ...recommendationOptions,
      ...{ seed_tracks: trackId, limit: 50 },
    };
    const tracksResponse = await spotifyApi.getFilteredRecommendations(recommendationOptions);
    const tracks: RecommendedTrack[] = [];
    tracksResponse.tracks.forEach((track: any, key) => {
      tracks.push({
        id: track.id,
        trackUri: track.uri,
        trackName: track.name,
        artistId: track.artists[0].id,
        artistName: track.artists[0].name,
        albumId: track.album.id,
        albumName: track.album.name,
        duration: track.duration_ms,
      });
    });

    tableStateDispatch({type: IS_NOT_LOADING});
    setRecommendedTracks(tracks);
  };

  const removeSelectedTrack = () => {
    setAreTracksLoading(false);
    setTracks([]);
    tableStateDispatch({type: IS_NOT_LOADING});
    setRecommendedTracks([]);
    setSeedTrackName(undefined);
    setTrackCleared(true);
  };

  return (
    <Page title="Similar Tracks">
      <h5>Search for and select a track, and we'll analyze its audio properties and create a playlist with similar tracks.</h5>
      <br />

      <FormGroup>
        <ControlLabel>Search Track</ControlLabel>
        <br />
        <InputPicker
          data={tracks}
          onSearch={(value) => searchTracks(value)}
          onSelect={selectTrack}
          onClean={removeSelectedTrack}
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
          value={!trackCleared ? (trackId ?? undefined) : undefined}
        />
      </FormGroup>

      {recommendedTracks.length > 0 && seedTrackName &&
        <div style={{ marginTop: '30px' }}>
          <h4>Similar tracks to {seedTrackName}</h4>

          <RecommendedTracksTable
            recommendations={recommendedTracks}
            tableState={tableState}
            tableStateDispatch={tableStateDispatch}
            playlistNameOverride={`Similar tracks to ${seedTrackName} (${moment().format('YYYY-MM-DD')})`}
          />
        </div>
      }
    </Page>
  );
};

export default SimilarTracks;