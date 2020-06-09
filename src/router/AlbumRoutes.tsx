import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import AlbumDetails from "../components/Albums/AlbumDetails/AlbumDetails";

const AlbumRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/:albumId`} render={() => <AlbumDetails />} />
    </>
  );
};

export default AlbumRoutes;
