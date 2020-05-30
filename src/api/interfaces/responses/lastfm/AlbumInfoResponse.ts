interface AlbumTrackInfo {
  name: string;
  url: string;
  duration: number;
  '@attr': {
    rank: string;
  };
  streamable: {
    '#text': string;
    fulltrack: string;
  },
  artist: {
    name: string;
    url: string;
  }
}

interface AlbumTrack {
  track: AlbumTrackInfo[];
}

export interface AlbumImage {
  '#text': string;
  size: string;
}

export interface AlbumInfo {
  name?: string;
  artist?: string;
  url?: string;
  image?: AlbumImage[];
  listeners?: number;
  playcount?: number;
  tracks?: AlbumTrack;
  tags?: {
    tag: string[];
  };
}

export default interface AlbumInfoResponse {
  album: AlbumInfo;
}
