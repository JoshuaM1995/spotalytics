/// <reference types="vite/client" />

declare module "moment" {
  import * as moment from "moment";
  export = moment;
}

declare module "lastfm-node-client";

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
