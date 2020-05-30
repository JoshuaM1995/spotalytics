const LastFm = require("lastfm-node-client");

export default class LastFMApi {
  private lastFmApi: any;

  constructor() {
    this.lastFmApi = new LastFm(
      process.env.REACT_APP_LAST_FM_API_KEY,
      process.env.REACT_APP_LAST_FM_SHARED_SECRET,
    );
  }

  public getArtistInfo(artist: string) {
    this.lastFmApi.artistGetInfo({ artist }).then((data: any) => {
      console.log('data', data);
    });
  }
}
