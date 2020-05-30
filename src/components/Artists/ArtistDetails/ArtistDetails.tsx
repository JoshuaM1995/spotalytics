import React, {useEffect} from 'react';
import Page from "../../Page/Page";
import LastFMApi from '../../../api/LastFMApi';
import {useParams} from "react-router";
const lastFMApi = new LastFMApi();

const ArtistDetails = () => {
  const { artistId } = useParams();

  useEffect(() => {
  }, []);

  return (
    <Page title="Artist Details">
      Artist Details
    </Page>
  );
};

export default ArtistDetails;
