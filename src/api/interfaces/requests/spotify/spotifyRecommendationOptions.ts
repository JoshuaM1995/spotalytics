export default interface SpotifyRecommendationOptions {
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