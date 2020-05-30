const Spotify = require('spotify-web-api-js');

export default class SpotifyApi {
  private spotifyApi = new Spotify();

  constructor(accessToken: string) {
    this.spotifyApi.setAccessToken(accessToken);
  }

  public static getAuthorizeURL(): string {
    const scopes = ['user-library-read', 'user-follow-read'];
    return'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authenticate');
  }

  public getTotalArtistCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getFollowedArtists({ limit: 1 }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        resolve(response.artists.total);
      });
    });
  }

  public getTotalAlbumCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMySavedAlbums({ limit: 1 }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }

  public getTotalTrackCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMySavedTracks({ limit: 1 }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }
}
