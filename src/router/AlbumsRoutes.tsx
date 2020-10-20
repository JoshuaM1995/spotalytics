import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import SavedAlbums from "../components/Albums/SavedAlbums/SavedAlbums";
import TopAlbums from "../components/Albums/TopAlbums/TopAlbums";

const AlbumsRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/top`} render={() => <TopAlbums />} />
      <Route exact path={`${match.path}/saved`} render={() => <SavedAlbums />} />
    </>
  );
};

export default AlbumsRoutes;
