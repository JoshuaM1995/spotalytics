import {ApiMethod} from "./constants";
import axios, {AxiosPromise} from 'axios';
import getRequestBody from "./request";

function apiRequest<Response = any>(
  url: string,
  method: ApiMethod = ApiMethod.GET,
  spotifyAccessToken: string,
  body?: Response,
): AxiosPromise<Response> {
    const requestOptions = getRequestBody(method, spotifyAccessToken, body);
    return axios(url, requestOptions);
}

export default apiRequest;
