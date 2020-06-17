import axios, {AxiosResponse} from 'axios';
import {useContext, useEffect, useState} from "react";
import {ApiMethod} from "../utils/constants";
import SpotifyContext from "../context/spotify";
import getRequestBody from "../utils/request";

interface ApiResponse<T> {
  data: T;
}

const source = axios.CancelToken.source();

interface ApiRequest<Response> {
  response: ApiResponse<Response>|null;
  error: any;
  isLoading: boolean;
}

function useApiRequest<Response = any>(
  url: string,
  method: ApiMethod = ApiMethod.GET,
  body?: Response,
): ApiRequest<Response> {
  const [response, setResponse] = useState<ApiResponse<Response>|null>(null);
  const [error, setError] = useState<{ error: any }|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    const requestOptions = getRequestBody(method, spotifyContext.accessToken, body, source.token);

    console.log('request options', requestOptions);

    axios(url, requestOptions).then((axiosResponse: AxiosResponse<Response>) => {
      setResponse(axiosResponse);
    }).catch((error) => {
      console.log('axios error', error);
      if (error.status === 401) {
        window.location.href = '/authenticate-spotify/reauthenticate';
      }

      setError(error);
    }).finally(() => {
      setIsLoading(false);
    });

    // Clean up the axios request in case the useEffect ends prematurely
    return () => {
      source.cancel();
    };
  }, []);

  return { response, error, isLoading };
}

export default useApiRequest;
