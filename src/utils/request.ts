import {ApiMethod} from "./constants";
import {AxiosRequestConfig, CancelToken} from "axios";

export default function getRequestBody<Response = any>(
  method: ApiMethod,
  spotifyAccessToken: string,
  body?: Response,
  cancelToken?: CancelToken,
) {
  let requestOptions: AxiosRequestConfig = {
    baseURL: 'http://localhost:5000/api',
    method,
    cancelToken,
  };

  if(method === ApiMethod.POST) {
    if(body) {
      requestOptions.data = body;
    }

    requestOptions.data = { ...requestOptions.data, spotifyAccessToken }
  } else {
    if(body) {
      requestOptions.params = body;
    }

    requestOptions.params = { ...requestOptions.params, spotifyAccessToken }
  }

  return requestOptions;
}
