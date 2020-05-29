import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import AllAlbums from "../components/Albums/AllAlbums/AllAlbums";

const AlbumsRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/all`} render={() => <AllAlbums />} />
    </>
  );
};

export default AlbumsRoutes;
