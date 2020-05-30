const Spotify = require('spotify-web-api-js');

export default class SpotifyApi {
  private spotifyApi = new Spotify();

  constructor(accessToken: string) {
    this.spotifyApi.setAccessToken(accessToken);
  }

  public static getAuthorizeURL(): string {
    const scopes = ['user-library-read', 'user-follow-read', 'user-top-read'];
    return'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authenticate-spotify');
  }

  public getTotalArtistCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getFollowedArtists({ limit }, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response.artists.total);
      });
    });
  }

  public getTotalAlbumCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMySavedAlbums({ limit }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }

  public getTotalTrackCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMySavedTracks({ limit }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }

  public getTopArtists(limit: number = 5): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMyTopArtists({ limit, time_range: 'long_term' }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        const artists = response.items;

        // Sort artists by highest number of followers
        artists.sort((a: any, b: any) => {
          return (a.followers.total > b.followers.total) ? -1 : 1;
        });

        resolve(artists);
      });
    });
  }

  public getTopAlbums(limit: number = 5): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMyTopTracks({ limit, time_range: 'long_term' }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        let albums = response.items;

        // Sort albums by highest popularity
        albums.sort((a: any, b: any) => {
          return (a.popularity > b.popularity) ? -1 : 1;
        });

        albums = response.items.map((item: any) => {
          return {
            ...item.album,
            top_track: item.name,
          };
        });

        resolve(albums);
      });
    });
  }

  public getTopTracks(limit: number = 10): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.spotifyApi.getMyTopTracks({ limit, time_range: 'long_term' }, (error: any, response: any) => {
        if(error) {
          reject(error);
        }

        let tracks = response.items;

        // Sort tracks by highest popularity
        tracks.sort((a: any, b: any) => {
          return (a.popularity > b.popularity) ? -1 : 1;
        });

        resolve(tracks);
      });
    });
  }

  private static processError(error: any, reject: any) {
    if(error) {
      if(error.status === 401) {
        window.location.href = '/authenticate-spotify/reauthenticate';
      }

      reject(error);
    }
  }
}
