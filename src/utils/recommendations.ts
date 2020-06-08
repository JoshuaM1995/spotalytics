import {
  AcousticnessOption,
  InstrumentalTrackOption
} from "../api/interfaces/requests/spotify/spotifyAdvancedRecommendationOptions";

export const getInstrumentalnessRecommendationOptions = (value: InstrumentalTrackOption) => {
  switch(value) {
    case InstrumentalTrackOption.INSTRUMENTAL_ONLY:
      return { min_instrumentalness: 0.6, max_instrumentalness: 1 };
    case InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY:
      return { min_instrumentalness: 0, max_instrumentalness: 0.5 };
  }
}

export const getAcousticnessRecommendationOptions = (value: AcousticnessOption) => {
  switch(value) {
    case AcousticnessOption.ACOUSTIC_ONLY:
      return { min_acousticness: 0.7, max_acousticness: 1 };
    case AcousticnessOption.NON_ACOUSTIC_ONLY:
      return { min_acousticness: 0, max_acousticness: 0.6 };
  }
}
