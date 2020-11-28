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
import AlbumGrid from '../../shared/AlbumGrid/AlbumGrid';

interface SimilarAlbumsParams {
  albumId?: string;
}

const initialTableState: TableState<any> = {
  data: [],
  page: 1,
  displayLength: 100,
  isLoading: true,
};

const SimilarTracks = () => {
  const [areAlbumsLoading, setAreAlbumsLoading] = useState(false);
  const [albums, setAlbums] = useState<any[]>([]);
  const [seedAlbumName, setSeedAlbumName] = useState<string>();
  const [recommendedAlbums, setRecommendedAlbums] = useState<any[]>([]);
  const [albumInfo, setAlbumInfo] = useState<SpotifyApi.SingleAlbumResponse>();
  const [albumCleared, setAlbumCleared] = useState(false);
  const { spotifyContext } = useContext(SpotifyContext);
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
  const { albumId } = useParams<SimilarAlbumsParams>();

  useAsyncEffect(async () => {
    // If a track id is part of the route params, load that track information, select it, then display recommendations in the table
    if (albumId && !seedAlbumName) {
      const albumInfo = await spotifyApi.getAlbumInfo(albumId);
      setAlbumInfo(albumInfo);

      setAlbums([
        { value: albumId, label: albumInfo.name }
      ]);

      await selectAlbum(albumId);
    }
  }, [albumId])

  const searchAlbums = _.debounce(async (searchTerm: string) => {
    setAreAlbumsLoading(true);

    const response: any = await spotifyApi.searchData(searchTerm, ['album'], 10);
    const albums = response.albums?.items.map((album: any) => {
      return {
        value: album.id,
        label: `${album.name} - ${album.artists[0].name}`,
      }
    });
    setAreAlbumsLoading(false);
    setAlbums(albums ?? []);
  }, 200);

  const selectAlbum = async (albumId: string) => {
    tableStateDispatch({ type: IS_LOADING });

    const albumTracks = await spotifyApi.getAlbumTracks(albumId);
    console.log('albumTracks', albumTracks);
    let album;

    // Don't use the pre-filled album info from the id in the url params if the album has been cleared
    if (albumCleared) {
      album = await spotifyApi.getAlbumInfo(albumId);
    } else {
      album = albumInfo ?? await spotifyApi.getAlbumInfo(albumId);
    }

    setSeedAlbumName(album.name);
    let totalAcousticness = 0;
    let totalDanceability = 0;
    let totalDurationMs = 0;
    let totalEnergy = 0;
    let totalInstrumentalness = 0;
    let totalLiveness = 0;
    let totalLoudness = 0;
    let totalSpeechiness = 0;
    let totalTempo = 0;
    let totalValence = 0;
    const albumTracksIds: string[] = _.map(albumTracks, (track) => track.id);
    const albumTracksFeatures = await spotifyApi.getTracksFeatures(albumTracksIds);
    const features = _.map(albumTracksFeatures, (features) => _.omit(features, ['analysis_url', 'id', 'track_href', 'type', 'uri']));
    const totalTracks = albumTracksIds.length;

    // Calculate total audio feature values
    _.forEach(features, (feature) => {
      totalAcousticness += feature.acousticness;
      totalDanceability += feature.danceability;
      totalDurationMs += feature.duration_ms;
      totalEnergy += feature.energy;
      totalInstrumentalness += feature.instrumentalness;
      totalLiveness += feature.liveness;
      totalLoudness += feature.loudness;
      totalSpeechiness += feature.speechiness;
      totalTempo += feature.tempo;
      totalValence += feature.valence;
    });

    // Remove metadata and only keep the track's features
    // Append "target_" to each key
    const recommendationOptions = {
      target_acousticness: parseFloat((totalAcousticness / totalTracks).toFixed(2)),
      target_danceability: parseFloat((totalDanceability / totalTracks).toFixed(2)),
      target_energy: parseFloat((totalEnergy / totalTracks).toFixed(2)),
      target_instrumentalness: parseFloat((totalInstrumentalness / totalTracks).toFixed(2)),
      target_liveness: parseFloat((totalLiveness / totalTracks).toFixed(2)),
      target_loudness: parseFloat((totalLoudness / totalTracks).toFixed(2)),
      target_speechiness: parseFloat((totalSpeechiness / totalTracks).toFixed(2)),
      target_tempo: parseFloat((totalTempo / totalTracks).toFixed(2)),
      target_valence: parseFloat((totalValence / totalTracks).toFixed(2)),
      seed_artists: album.artists[0].id,
      limit: 50
    };
    const tracksResponse = await spotifyApi.getFilteredRecommendations(recommendationOptions);
    const albums: any[] = [];
    console.log('tracksResponse', tracksResponse);

    // TODO: Loop through tracks and get the album they belong to

    tableStateDispatch({ type: IS_NOT_LOADING });
    setRecommendedAlbums(albums);
  };

  const removeSelectedTrack = () => {
    setAreAlbumsLoading(false);
    setAlbums([]);
    tableStateDispatch({ type: IS_NOT_LOADING });
    setRecommendedAlbums([]);
    setSeedAlbumName(undefined);
    setAlbumCleared(true);
  };

  return (
    <Page title="Similar Albums">
      <h5>Search for and select an album, and we'll analyze the audio properties of all it's tracks and find similar albums.</h5>
      <br />

      <FormGroup>
        <ControlLabel>Search Album</ControlLabel>
        <br />
        <InputPicker
          data={albums}
          onSearch={(value) => searchAlbums(value)}
          onSelect={selectAlbum}
          onClean={removeSelectedTrack}
          loading={areAlbumsLoading}
          style={{ minWidth: '300px' }}
          renderMenu={menu => {
            if (areAlbumsLoading) {
              return (
                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                  <Icon icon="spinner" spin /> Loading...
                </p>
              );
            }
            return menu;
          }}
          value={!albumCleared ? (albumId ?? undefined) : undefined}
        />
      </FormGroup>

      {recommendedAlbums.length > 0 && seedAlbumName &&
        <div style={{ marginTop: '30px' }}>
          <h4>Similar tracks to {seedAlbumName}</h4>

          <AlbumGrid albums={albums} />
        </div>
      }
    </Page>
  );
};

export default SimilarTracks;
