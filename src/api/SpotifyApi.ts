import moment from "moment";

const Spotify = require('spotify-web-api-js');

export default class SpotifyApi {
  private spotify = new Spotify();

  constructor(accessToken: string) {
    this.spotify.setAccessToken(accessToken);
  }

  public static getAuthorizeURL(): string {
    const scopes = [
      'user-library-read',
      'user-follow-read',
      'user-top-read',
      'user-follow-modify',
      'user-read-recently-played',
      // 'user-library-modify',
    ];
    return 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes.join(' ')) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/authenticate-spotify');
  }

  public getTotalArtistCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotify.getFollowedArtists({limit}, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response.artists.total);
      });
    });
  }

  public getTotalAlbumCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotify.getMySavedAlbums({limit}, (error: any, response: any) => {
        if (error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }

  public getTotalTrackCount(limit: number = 1): Promise<number> {
    return new Promise((resolve, reject) => {
      this.spotify.getMySavedTracks({limit}, (error: any, response: any) => {
        if (error) {
          reject(error);
        }

        resolve(response.total);
      });
    });
  }

  public getTopArtists(limit: number = 5): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.spotify.getMyTopArtists({limit, time_range: 'long_term'}, (error: any, response: any) => {
        if (error) {
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
      this.spotify.getMyTopTracks({limit, time_range: 'long_term'}, (error: any, response: any) => {
        if (error) {
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

  public getTopTracks(time_range: string = 'short_term', limit: number = 10): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.spotify.getMyTopTracks({limit, time_range}, (error: any, response: any) => {
        if (error) {
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

  public getArtistsAlbums(artistId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spotify.getArtistAlbums(artistId, (error: any, artistsAlbums: any) => {
        SpotifyApi.processError(error, reject);

        const albums = artistsAlbums.items;

        // Sort albums by release date, with the latest release at the top
        albums.sort((a: any, b: any) => {
          const releaseDateOne = moment(a.release_date);
          const releaseDateTwo = moment(b.release_date);
          return releaseDateTwo.isAfter(releaseDateOne) ? 1 : -1;
        });

        // Add visible property to each album in the array
        const albumsWithVisibility = albums.map((album: any) => {
          return {
            ...album,
            visible: true,
          };
        });

        resolve(albumsWithVisibility);
      });
    });
  }

  public getRelatedArtists(artistId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spotify.getArtistRelatedArtists(artistId, (error: any, relatedArtists: any) => {
        SpotifyApi.processError(error, reject);

        // Sort related artists by the most followers at the top
        relatedArtists.artists.sort((a: any, b: any) => {
          return b.followers.total > a.followers.total ? 1 : -1;
        });

        resolve(relatedArtists.artists);
      });
    });
  }

  public getArtistInfo(artistId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spotify.getArtist(artistId, (error: any, artistInfo: any) => {
        SpotifyApi.processError(error, reject);
          resolve(artistInfo);
      });
    });
  }

  public getAlbumInfo(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spotify.getAlbum(id, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response);
      });
    });
  }

  public getTopTracksByCountry(artistId: string, countryCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.spotify.getArtistTopTracks(artistId, countryCode, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response.tracks);
      });
    });
  }

  public getIsCurrentUserFollowingArtists(artistIds: string[]) {
    return new Promise((resolve, reject) => {
      this.spotify.isFollowingArtists(artistIds, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response);
      });
    });
  }

  public getCurrentUserFollowedArtists(after?: string) {
    return new Promise((resolve, reject) => {
      const options = after ? { limit: 10, after } : { limit: 10 };

      this.spotify.getFollowedArtists(options, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);

        // Sort followed artists by the most followers at the top
        response.artists.items.sort((a: any, b: any) => {
          return b.followers.total > a.followers.total ? 1 : -1;
        });

        resolve(response);
      });
    });
  }

  public getRecentlyPlayedTracks() {
    return new Promise((resolve, reject) => {
      this.spotify.getMyRecentlyPlayedTracks({}, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);

        console.log('recently played tracks', response);

        resolve(response);
      });
    });
  }

  public putFollowArtists(artistIds: string[]) {
    return new Promise((resolve, reject) => {
      this.spotify.followArtists(artistIds, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response);
      });
    });
  }

  public putUnFollowArtists(artistIds: string[]) {
    return new Promise((resolve, reject) => {
      this.spotify.unfollowArtists(artistIds, (error: any, response: any) => {
        SpotifyApi.processError(error, reject);
        resolve(response);
      });
    });
  }

  private static processError(error: any, reject: any) {
    if (error) {
      if (error.status === 401) {
        window.location.href = '/authenticate-spotify/reauthenticate';
      }

      reject(error);
    }
  }
}
