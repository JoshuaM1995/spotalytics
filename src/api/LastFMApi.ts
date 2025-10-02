import { AlbumInfoResponse } from "./interfaces/responses/lastfm";
import { AlbumInfo } from "./interfaces/responses/lastfm/AlbumInfoResponse";
import LastFm from "lastfm-node-client";

export default class LastFMApi {
  private lastFmApi: any;

  constructor() {
    console.log("api key", import.meta.env.VITE_LAST_FM_API_KEY);
    console.log("secret", import.meta.env.VITE_LAST_FM_SHARED_SECRET);

    this.lastFmApi = new LastFm(
      import.meta.env.VITE_LAST_FM_API_KEY,
      import.meta.env.VITE_LAST_FM_SHARED_SECRET
    );
  }

  public async getArtistInfo(artist: string): Promise<any> {
    return this.lastFmApi.artistGetInfo({ artist });
  }

  public async getAlbumInfo(artist: string, album: string): Promise<AlbumInfo> {
    return this.lastFmApi
      .albumGetInfo({ artist, album })
      .then((data: AlbumInfoResponse) => {
        return data.album;
      });
  }
}
