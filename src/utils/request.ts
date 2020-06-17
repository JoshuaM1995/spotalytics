import {ApiMethod} from "./constants";
import axios, {AxiosRequestConfig, CancelToken} from "axios";
import jwt from "jsonwebtoken";

const token = jwt.sign({}, process.env.REACT_APP_API_SERVER_JWT_TOKEN_SECRET ?? '');
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

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
