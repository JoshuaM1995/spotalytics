import React, {useContext, useEffect, useState} from 'react';
import {Col, ControlLabel, Message, Row, TagPicker} from "rsuite";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";
import {Field} from "formik";
import _ from "lodash";

interface RecommendationSeedDataProps {
  title: string;
  showArtists?: boolean;
  showTracks?: boolean;
  showGenres?: boolean;
}

const RecommendationSeedData = ({
  title,
  showArtists = true,
  showTracks = true,
  showGenres = true,
}: RecommendationSeedDataProps) => {
  const [areArtistsLoading, setAreArtistsLoading] = useState(false);
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [areTracksLoading, setAreTracksLoading] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const [genreOptions, setGenreOptions] = useState<any[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    // Pre-fill genre options
    spotifyApi.getAvailableGenres().then((response: SpotifyApi.AvailableGenreSeedsResponse) => {
      const genres = response.genres.map((genre) => {
        return {value: genre, label: genre}
      });
      setGenreOptions(genres);
    });
  }, [spotifyApi]);

  const searchArtists = _.debounce((searchTerm: string) => {
    setAreArtistsLoading(true);

    spotifyApi.searchData(searchTerm, ['artist'], 10).then((response: SpotifyApi.SearchResponse) => {
      const artists = response.artists?.items.map((artist) => {
        return {value: artist.id, label: artist.name}
      });
      setAreArtistsLoading(false);
      setArtists(artists ?? []);
    });
  }, 200);

  const handleArtistChange = (values: any, form: any) => {
    // We are removing an artist from the tag picker
    if (values.length === (selectedArtists.length - 1)) {
      let newSelectedArtists: any[] = [];
      let newFieldValues: string[] = [];

      selectedArtists.forEach((artist: any) => {
        if (values.includes(artist.value)) {
          newSelectedArtists.push({
            value: artist.value,
            label: artist.label,
          });
          newFieldValues.push(artist.value);
        }
      });

      setArtists(newSelectedArtists);
      setSelectedArtists(newSelectedArtists);
      form.setFieldValue('seed_artists', newFieldValues);
    }
  };

  const searchTracks = _.debounce((searchTerm: string) => {
    setAreTracksLoading(true);

    spotifyApi.searchData(searchTerm, ['track'], 10).then((response: SpotifyApi.SearchResponse) => {
      const tracks = response.tracks?.items.map((track: any) => {
        return {
          value: track.id,
          label: `${track.name} - ${track.artists[0].name}`,
        }
      });
      setAreTracksLoading(false);
      setTracks(tracks ?? []);
    });
  }, 200);

  const handleTrackChange = (values: any, form: any) => {
    // We are removing a track from the tag picker
    if (values.length === (selectedTracks.length - 1)) {
      let newSelectedTracks: any[] = [];
      let newFieldValues: string[] = [];

      selectedTracks.forEach((track: any) => {
        if (values.includes(track.value)) {
          newSelectedTracks.push({
            value: track.value,
            label: track.label,
          });
          newFieldValues.push(track.value);
        }
      });

      setTracks(newSelectedTracks);
      setSelectedTracks(newSelectedTracks);
      form.setFieldValue('seed_tracks', newFieldValues);
    }
  };

  return (
    <Row>
      <Col><h3>{title}</h3></Col>
      <br />

      {(showArtists || showTracks) &&
      <Message
        type="info"
        showIcon
        description={`Up to 5 seed values may be provided in any combination of artists,
                      tracks and genres. Spotify's algorithm may not return anything if
                      your selected data has recently been added to Spotify or if it's
                      too obscure, or if you have too many filters selected.`}
      />}
      {(!showArtists || !showTracks) &&
      <Message
        type="info"
        showIcon
        description={`Up to 3 seed values may be provided in any combination of artists,
                      tracks and genres. Spotify's algorithm may not return anything if
                      your top artists/albums have recently been added to Spotify, if
                      they're too obscure, or if you have too many filters selected.`}
      />}
      <br />

      {showArtists &&
      <Col xs={24} md={8}>
        <ControlLabel style={{marginBottom: 8}}>Seed Artists</ControlLabel>
        <Field
          name="seed_artists"
          render={({field, form}: any) => (
            <TagPicker
              {...field}
              data={artists}
              cacheData={selectedArtists}
              loading={areArtistsLoading}
              placeholder="Search Artists..."
              style={{width: '100%'}}
              onSearch={(value) => searchArtists(value)}
              onChange={(values) => handleArtistChange(values, form)}
              onSelect={(value, item) => {
                setSelectedArtists([...selectedArtists, item]);
                form.setFieldValue('seed_artists', value);
              }}
              onClean={() => {
                setSelectedArtists([]);
                form.setFieldValue('seed_artists', []);
              }}
            />
          )}
        />
      </Col>}

      {showTracks &&
      <Col xs={24} md={8}>
        <ControlLabel style={{marginBottom: 8}}>Seed Tracks</ControlLabel>
        <Field
          name="seed_tracks"
          render={({field, form}: any) => (
            <TagPicker
              {...field}
              data={tracks}
              cacheData={selectedTracks}
              loading={areTracksLoading}
              placeholder="Search Tracks..."
              style={{width: '100%'}}
              onSearch={(value) => searchTracks(value)}
              onChange={(values) => handleTrackChange(values, form)}
              onSelect={(value, item) => {
                setSelectedTracks([...selectedTracks, item]);
                form.setFieldValue('seed_tracks', value);
              }}
              onClean={() => {
                setSelectedTracks([]);
                form.setFieldValue('seed_tracks', []);
              }}
            />
          )}
        />
      </Col>}

      {showGenres &&
      <Col xs={24} md={8}>
        <ControlLabel style={{ marginBottom: 8 }}>Seed Genres</ControlLabel>
        <Field
          name="seed_genres"
          render={({field, form}: any) => (
            <TagPicker
              {...field}
              data={genreOptions}
              placeholder="Select Genre(s)"
              style={{width: '100%'}}
              onChange={(value) => form.setFieldValue('seed_genres', value)}
            />
          )}
        />
      </Col>}
    </Row>
  );
};

export default RecommendationSeedData;
