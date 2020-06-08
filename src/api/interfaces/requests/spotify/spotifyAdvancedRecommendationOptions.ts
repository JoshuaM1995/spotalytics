export enum SeedTypeOption {
  BOTH = 'Both',
  ARTIST = 'Artist',
  ALBUM = 'Album',
}

export enum InstrumentalTrackOption {
  ANY = 'Any',
  NON_INSTRUMENTAL_ONLY = 'Non-Instrumental Only',
  INSTRUMENTAL_ONLY = 'Instrumental Only',
}

export enum AcousticnessOption {
  ANY = 'Any',
  ACOUSTIC_ONLY = 'Acoustic Only',
  NON_ACOUSTIC_ONLY = 'Non-Acoustic Only',
}

export enum GenericRangeOption {
  ANY = 'Any',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum LiveTrackOption {
  ANY = 'Any',
  LIVE_ONLY = 'Live Tracks Only',
  STUDIO_ONLY = 'Studio Tracks Only',
}

export enum SpokenWordOption {
  ANY = 'Any',
  SPOKEN_WORD_ONLY = 'Spoken Word Only',
  SPOKEN_AND_MUSIC = 'Spoken Word and Music',
  MUSIC_ONLY = 'Music Only',
}

export enum LoudnessOption {
  ANY = 'Any',
  QUIET = 'Quiet',
  MEDIUM = 'Medium',
  LOUD = 'Loud',
}

export enum DurationOption {
  ANY = 'Any',
  SHORT = 'Short (0-4 minutes)',
  MEDIUM = 'Medium (4-12 minutes)',
  LONG = 'Long (12+ minutes)',
}

export enum TempoOption {
  ANY = 'Any',
  SLOW = 'Slow (0-60 BPM)',
  MEDIUM = 'Medium (60-120 BPM)',
  FAST = 'Fast (120+ BPM)',
}

export interface SpotifySimpleRecommendationOptions {
  recommendation_data: SeedTypeOption;
  instrumental_tracks: InstrumentalTrackOption;
  acousticness: AcousticnessOption;
  live_tracks: LiveTrackOption;
  danceability: GenericRangeOption;
  energy: GenericRangeOption;
  spoken_word: SpokenWordOption;
  positivity: GenericRangeOption;
  loudness: LoudnessOption;
  duration: DurationOption;
  popularity: GenericRangeOption;
  tempo: TempoOption;
}

export interface SpotifyAdvancedRecommendationOptions {
  min_instrumentalness: number;
  max_instrumentalness: number;
  min_acousticness: number;
  max_acousticness: number;
  min_danceability: number;
  max_danceability: number;
  min_energy: number;
  max_energy: number;
  min_liveness: number;
  max_liveness: number;
  min_loudness: number;
  max_loudness: number;
  min_mode: number;
  max_mode: number;
  min_key: number;
  max_key: number;
  min_popularity: number;
  max_popularity: number;
  min_speechiness: number;
  max_speechiness: number;
  min_tempo: number;
  max_tempo: number;
  min_valence: number;
  max_valence: number;
  min_time_signature: number;
  max_time_signature: number;
  min_duration_ms: number;
  max_duration_ms: number;
}
