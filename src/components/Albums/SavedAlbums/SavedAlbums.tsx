import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import SpotifyContext from "../../../context/spotify";
import AlbumGrid from "../../shared/AlbumGrid/AlbumGrid";
import SpotifyApi from "../../../api/SpotifyApi";
import {Loader} from "rsuite";

const itemsPerPage = 50;

const SavedAlbums = () => {
  const [pageTitle, setPageTitle] = useState("Saved Albums");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [albums, setAlbums] = useState<any[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getCurrentUserSavedAlbums(itemsPerPage).then((response: any) => {
      setAlbums(response.items);
      setPageTitle(`${pageTitle} (${response.total})`);
    });
  }, []);

  const loadItems = (page: number) => {
    const offset = itemsPerPage * (page - 1);

    // Only make API requests if there are items to load
    if(hasMoreItems) {
      const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

      spotifyApi.getCurrentUserSavedAlbums(itemsPerPage, offset).then((response: any) => {
        setAlbums([
          ...albums,
          ...response.items,
        ]);

        // Once we reached the end of the artists, stop the scrolling events
        if(albums.length >= parseInt(response.total)) {
          setHasMoreItems(false);
        }
      });
    }
  };

  return (
    <Page title={pageTitle}>
      <AlbumGrid
        albums={albums}
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

export default SavedAlbums;
