import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import SavedAlbums from "../../components/Albums/SavedAlbums/SavedAlbums";

const AlbumsRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/saved`} render={() => <SavedAlbums />} />
    </>
  );
};

export default AlbumsRoutes;
