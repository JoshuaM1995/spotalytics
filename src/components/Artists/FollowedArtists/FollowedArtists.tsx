import React, {useContext, useEffect, useState} from 'react';
import SpotifyContext from "../../../context/spotify";
import ArtistList from "../../shared/ArtistList";
import Page from "../../Page/Page";
import SpotifyApi from "../../../api/SpotifyApi";

const FollowedArtists = () => {
  const [pageTitle, setPageTitle] = useState("Followed Artists");
  const [artists, setArtists] = useState([]);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getCurrentUserFollowedArtists().then((response: any) => {
      setArtists(response.artists.items);
      setPageTitle(`${pageTitle} (${response.artists.total})`);
    });
  }, []);

  return (
    <Page title={pageTitle} contentStyle={{ padding: 0 }}>
      <ArtistList artists={artists} />
    </Page>
  );
};

export default FollowedArtists;
