import {
  AcousticnessOption,
  DurationOption,
  GenericRangeOption,
  InstrumentalTrackOption,
  LiveTrackOption,
  LoudnessOption,
  SpokenWordOption,
  TempoOption
} from "../api/interfaces/requests/spotify/spotifyAdvancedRecommendationOptions";
import moment from "moment";

export const getInstrumentalnessRecommendationOptions = (value: InstrumentalTrackOption) => {
  switch(value) {
    case InstrumentalTrackOption.INSTRUMENTAL_ONLY:
      return { min_instrumentalness: 0.6, max_instrumentalness: 1 };
    case InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY:
      return { min_instrumentalness: 0, max_instrumentalness: 0.5 };
    default: return {};
  }
}

export const getAcousticnessRecommendationOptions = (value: AcousticnessOption) => {
  switch(value) {
    case AcousticnessOption.ACOUSTIC_ONLY:
      return { min_acousticness: 0.7, max_acousticness: 1 };
    case AcousticnessOption.NON_ACOUSTIC_ONLY:
      return { min_acousticness: 0, max_acousticness: 0.6 };
    default: return {};
  }
}

export const getLiveTrackRecommendationOptions = (value: LiveTrackOption) => {
  switch(value) {
    case LiveTrackOption.LIVE_ONLY:
      return { min_liveness: 0.8, max_liveness: 1 };
    case LiveTrackOption.STUDIO_ONLY:
      return { min_liveness: 0, max_liveness: 0.8 };
    default: return {};
  }
}

export const getDanceabilityRecommendationOptions = (value: GenericRangeOption) => {
  switch(value) {
    case GenericRangeOption.LOW:
      return { min_danceability: 0, max_danceability: 0.3 };
    case GenericRangeOption.MEDIUM:
      return { min_danceability: 0.3, max_danceability: 0.6 };
    case GenericRangeOption.HIGH:
      return { min_danceability: 0.6, max_danceability: 1 };
    default: return {};
  }
};

export const getEnergyRecommendationOptions = (value: GenericRangeOption) => {
  switch(value) {
    case GenericRangeOption.LOW:
      return { min_energy: 0, max_energy: 0.33 };
    case GenericRangeOption.MEDIUM:
      return { min_energy: 0.33, max_energy: 0.66 };
    case GenericRangeOption.HIGH:
      return { min_energy: 0.66, max_energy: 1 };
    default: return {};
  }
};

export const getSpeechinessRecommendationOptions = (value: SpokenWordOption) => {
  switch(value) {
    case SpokenWordOption.MUSIC_ONLY:
      return { min_speechiness: 0, max_speechiness: 0.33 };
    case SpokenWordOption.SPOKEN_AND_MUSIC:
      return { min_speechiness: 0.33, max_speechiness: 0.66 };
    case SpokenWordOption.SPOKEN_WORD_ONLY:
      return { min_speechiness: 0.66, max_speechiness: 1 };
    default: return {};
  }
};

export const getPositivityRecommendationOptions = (value: GenericRangeOption) => {
  switch(value) {
    case GenericRangeOption.LOW:
      return { min_positivity: 0, max_positivity: 0.33 };
    case GenericRangeOption.MEDIUM:
      return { min_positivity: 0.33, max_positivity: 0.66 };
    case GenericRangeOption.HIGH:
      return { min_positivity: 0.66, max_positivity: 1 };
    default: return {};
  }
};

export const getLoudnessRecommendationOptions = (value: LoudnessOption) => {
  switch(value) {
    case LoudnessOption.QUIET:
      return { min_loudness: 0, max_loudness: 30 };
    case LoudnessOption.MEDIUM:
      return { min_loudness: 30, max_loudness: 60 };
    case LoudnessOption.LOUD:
      return { min_loudness: 60 };
    default: return {};
  }
};

export const getDurationRecommendationOptions = (value: DurationOption) => {
  switch(value) {
    case DurationOption.SHORT:
      return {
        min_duration_ms: 0,
        max_duration_ms: moment.duration('4', 'minutes').asMilliseconds(),
      };
    case DurationOption.MEDIUM:
      return {
        min_duration_ms: moment.duration('4', 'minutes').asMilliseconds(),
        max_duration_ms: moment.duration('12', 'minutes').asMilliseconds(),
      };
    case DurationOption.LONG:
      return {
        min_duration_ms: moment.duration('12', 'minutes').asMilliseconds(),
      };
    default: return {};
  }
};

export const getPopularityRecommendationOptions = (value: GenericRangeOption) => {
  switch (value) {
    case GenericRangeOption.LOW:
      return {min_popularity: 0, max_popularity: 33};
    case GenericRangeOption.MEDIUM:
      return {min_popularity: 33, max_popularity: 66};
    case GenericRangeOption.HIGH:
      return {min_popularity: 66, max_popularity: 100};
    default:
      return {};
  }
};

export const getTempoRecommendationOptions = (value: TempoOption) => {
  switch(value) {
    case TempoOption.SLOW:
      return { min_tempo: 0, max_tempo: 60 };
    case TempoOption.MEDIUM:
      return { min_tempo: 60, max_tempo: 120 };
    case TempoOption.FAST:
      return { min_tempo: 120 };
    default:
      return {};
  }
};

export const getSeedGenreOptions = (value: string[]): any => {
  return { seed_genres: value.join(',') };
};
