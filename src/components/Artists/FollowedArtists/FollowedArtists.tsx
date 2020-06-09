import React, {useContext, useEffect, useState} from 'react';
import SpotifyContext from "../../../context/spotify";
import ArtistList from "../../shared/ArtistList/ArtistList";
import Page from "../../Page/Page";
import SpotifyApi from "../../../api/SpotifyApi";
import {Loader} from "rsuite";

const FollowedArtists = () => {
  const [pageTitle, setPageTitle] = useState("Followed Artists");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [artists, setArtists] = useState<any[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getCurrentUserFollowedArtists().then((response: any) => {
      setArtists(response.artists.items);
      setPageTitle(`${pageTitle} (${response.artists.total})`);
    });
  }, []);

  const loadItems = () => {
    // Only make API requests if there are items to load
    if(hasMoreItems) {
      const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
      const after = artists[artists.length - 1] ? artists[artists.length - 1].id : undefined;

      spotifyApi.getCurrentUserFollowedArtists(after).then((response: any) => {
        setArtists([
          ...artists,
          ...response.artists.items,
        ]);

        // Once we reached the end of the artists, stop the scrolling events
        if(artists.length >= parseInt(response.artists.total)) {
          setHasMoreItems(false);
        }
      });
    }
  };

  return (
    <Page title={pageTitle} contentStyle={{padding: 0}}>
      <ArtistList
        artists={artists}
        infiniteScroll
        infiniteScrollProps={{
          pageStart: 0,
          loadMore: loadItems,
          hasMore: hasMoreItems,
          loader: (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '15px 0' }}>
              <Loader content="Loading..." />
            </div>
          ),
        }}
      />
    </Page>
  );
};

export default FollowedArtists;
