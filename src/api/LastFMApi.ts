import {AlbumInfoResponse} from "./interfaces/responses/lastfm";
import {AlbumInfo} from "./interfaces/responses/lastfm/AlbumInfoResponse";

const LastFm = require("lastfm-node-client");

export default class LastFMApi {
  private lastFmApi: any;

  constructor() {
    this.lastFmApi = new LastFm(
      process.env.REACT_APP_LAST_FM_API_KEY,
      process.env.REACT_APP_LAST_FM_SHARED_SECRET,
    );
  }

  public async getArtistInfo(artist: string): Promise<any> {
    return this.lastFmApi.artistGetInfo({ artist });
  }

  public async getAlbumInfo(artist: string, album: string): Promise<AlbumInfo> {
    return this.lastFmApi.albumGetInfo({ artist, album }).then((data: AlbumInfoResponse) => {
      return data.album;
    });
  }
}
