export default class Spotify {
  public static getAuthorizeURL(): string {
    const scopes = ['user-read-private',  'user-read-email'];
    return'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authenticate');
  }
}
