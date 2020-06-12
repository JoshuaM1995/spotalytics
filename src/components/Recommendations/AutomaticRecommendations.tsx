import React, {useContext, useEffect, useState} from 'react';
import {Button, Tag} from "rsuite";
import SpotifyContext from "../../context/spotify";
import SpotifyApi from "../../api/SpotifyApi";
import {TimeRange} from "../../utils/constants";
import moment from 'moment';
import {topValueInArray} from "../../utils/global";

enum Feature {
  DANCEABILITY = 'DANCEABILITY',
  ENERGY = 'ENERGY',
  POSITIVITY = 'POSITIVITY',
  LOUDNESS = 'LOUDNESS',
  SPEED = 'SPEED',
  INSTRUMENTALNESS = 'INSTRUMENTALNESS',
  LIVENESS = 'LIVENESS',
  DURATION = 'DURATION',
}

interface FeatureValue {
  average: number;
  description: string;
  color?: string;
}

interface AverageFeatureValues {
  danceability: FeatureValue;
  energy: FeatureValue;
  positivity: FeatureValue;
  loudness: FeatureValue;
  speed: FeatureValue;
  instrumentalness: FeatureValue;
  liveness: FeatureValue;
  durationMs: FeatureValue;
}

const initialAverageFeatureValues: AverageFeatureValues = {
  danceability: { average: 0, description: '', color: 'violet' },
  energy: { average: 0, description: '', color: 'orange' },
  loudness: { average: 0, description: '', color: 'red', },
  positivity: { average: 0, description: '', color: 'blue' },
  speed: { average: 0, description: '', color: 'cyan' },
  instrumentalness: { average: 0, description: '', color: 'cyan' },
  liveness: { average: 0, description: '', color: 'cyan' },
  durationMs: { average: 0, description: '' },
};

const TRACKS_TO_ANALYZE = 50;

const getFeatureDescription = (feature: Feature, average: number): string => {
  console.log(feature + ' AVERAGE', average);
  switch(feature) {
    case Feature.DANCEABILITY:
      let danceability = 'high in';

      if(average > 0 && average <= 0.5) {
        danceability = 'low in';
      } else if(average > 0.5 && average < 0.7) {
        danceability = 'medium in';
      }

      return danceability;
    case Feature.ENERGY:
      let energy = 'high in';

      if(average > 0 && average <= 0.5) {
        energy = 'low in';
      } else if(average > 0.5 && average < 0.7) {
        energy = 'medium in';
      }

      return energy;
    case Feature.LOUDNESS:
      let loudness = 'very';

      if(average > -60 && average <= -30) {
        loudness = 'not very';
      } else if(average > -30 && average < -10) {
        loudness = 'somewhat';
      }

      return loudness;
    case Feature.POSITIVITY:
      let positivity = 'high in';

      if(average > 0 && average <= 0.5) {
        positivity = 'low in';
      } else if(average > 0.5 && average < 0.7) {
        positivity = 'medium in';
      }

      return positivity;
    case Feature.SPEED:
      let speed = 'very';

      if(average > 0 && average <= 60) {
        speed = 'not very';
      } else if(average > 60 && average < 120) {
        speed = 'somewhat';
      }

      return speed;
    case Feature.INSTRUMENTALNESS:
      if(average <= 0.5) {
        return 'non-instrumental';
      } else {
        return 'instrumental';
      }
    case Feature.LIVENESS:
      if(average <= 0.5) {
        return 'in the studio';
      } else {
        return 'live';
      }
    case Feature.DURATION:
      return moment.duration(average).asMinutes().toFixed(1).toString() + ' minutes';
    default: return '';
  }
}

const AutomaticRecommendations = () => {
  const [topArtist, setTopArtist] = useState<string>('');
  const [topGenre, setTopGenre] = useState<string>('');
  const [ featureValues, setFeatureValues ] = useState<AverageFeatureValues>(
    initialAverageFeatureValues
  );
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getTopTracks(TimeRange.LONG_TERM, TRACKS_TO_ANALYZE).then((topTracks) => {
      const trackIds: string[] = [];
      const artistIds: string[] = [];

      topTracks.forEach((track) => {
        trackIds.push(track.id);
        artistIds.push(track.artists[0].id);
      });

      spotifyApi.getArtistsInfo(artistIds).then((artistsInfo) => {
        let genres: any[] = [];

        artistsInfo.forEach((artist) => {
          genres = [ ...genres, artist.genres ];
        });

        genres = genres.flat();
        setTopGenre(topValueInArray(genres));
      });

      spotifyApi.getTracksFeatures(trackIds).then((trackFeatures: SpotifyApi.AudioFeaturesObject[]) => {
        let totalDanceability = featureValues.danceability.average;
        let totalEnergy = featureValues.energy.average;
        let totalLoudness = featureValues.loudness.average;
        let totalPositivity = featureValues.positivity.average;
        let totalSpeed = featureValues.speed.average;
        let totalInstrumentalness = featureValues.instrumentalness.average;
        let totalLiveness = featureValues.liveness.average;
        let totalDurationMs = 0;

        trackFeatures.forEach((feature) => {
          totalDanceability += feature.danceability;
          totalEnergy += feature.energy;
          totalLoudness += feature.loudness;
          totalPositivity += feature.valence;
          totalSpeed += feature.tempo;
          totalInstrumentalness += feature.instrumentalness;
          totalLiveness += feature.liveness;
          totalDurationMs += feature.duration_ms;
        });

        setFeatureValues({
          ...featureValues,
          danceability: {
            ...featureValues.danceability,
            average: totalDanceability / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.DANCEABILITY, totalDanceability / TRACKS_TO_ANALYZE),
          },
          energy: {
            ...featureValues.energy,
            average: totalEnergy / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.ENERGY, totalEnergy / TRACKS_TO_ANALYZE),
          },
          loudness: {
            ...featureValues.loudness,
            average: totalLoudness / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.LOUDNESS, totalLoudness / TRACKS_TO_ANALYZE),
          },
          positivity: {
            ...featureValues.positivity,
            average: totalPositivity / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.POSITIVITY, totalPositivity / TRACKS_TO_ANALYZE),
          },
          speed: {
            ...featureValues.speed,
            average: totalSpeed / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.SPEED, totalSpeed / TRACKS_TO_ANALYZE),
          },
          instrumentalness: {
            ...featureValues.instrumentalness,
            average: totalInstrumentalness / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.INSTRUMENTALNESS, totalInstrumentalness / TRACKS_TO_ANALYZE),
          },
          liveness: {
            ...featureValues.liveness,
            average: totalLiveness / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.LIVENESS, totalLiveness / TRACKS_TO_ANALYZE),
          },
          durationMs: {
            ...featureValues.durationMs,
            average: totalDurationMs / TRACKS_TO_ANALYZE,
            description: getFeatureDescription(Feature.DURATION, totalDurationMs / TRACKS_TO_ANALYZE),
          },
        });
      });
    });

    spotifyApi.getTopArtists(1, TimeRange.LONG_TERM).then((response) => {
      setTopArtist(response[0].name);
    });
  }, []);

  return (
    <>
      <h5 style={{marginLeft: 8}}>
        The music you listen to most is:{' '}
        {featureValues.danceability.description} <Tag color={featureValues.danceability.color}>danceability</Tag>{' '}
        {featureValues.energy.description}<Tag color={featureValues.energy.color}>energy</Tag>{' '}
        {featureValues.positivity.description}<Tag color={featureValues.positivity.color}>positivity</Tag>{' '}
        {featureValues.loudness.description}<Tag color={featureValues.loudness.color}>loud</Tag>{' '}
        and {featureValues.speed.description}<Tag color={featureValues.speed.color}>fast</Tag>
        <br /><br />

        You tend to prefer <Tag>{featureValues.instrumentalness.description}</Tag> tracks which are generally
        recorded<Tag>in the studio</Tag>. The songs you listen to tend to be around
        <Tag>{featureValues.durationMs.description}</Tag> long on average.
        <br /><br />

        Your top artist is <Tag>{topArtist}</Tag> and your top genre is<Tag>{topGenre}</Tag>.
      </h5>
      <br /><br />

      <Button color="green">Get Recommendations</Button>
    </>
  );
};

export default AutomaticRecommendations;
