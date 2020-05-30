const Spotify = require('spotify-web-api-js');

export default class SpotifyApi {
  private spotifyApi = new Spotify();

  constructor(accessToken: string) {
    console.log('access token', accessToken);
    this.spotifyApi.setAccessToken(accessToken);
  }

  public static getAuthorizeURL(): string {
    const scopes = ['user-library-read'];
    return'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authenticate');
  }

  public getSavedTracks() {
    this.spotifyApi.getMySavedTracks({ limit: 10 }, (err: any, response: any) => {
      console.log('response', response);
      console.log('err', err);
    });
  }
}
