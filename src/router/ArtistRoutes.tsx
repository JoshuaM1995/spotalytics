import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import ArtistDetails from "../components/Artists/ArtistDetails/ArtistDetails";

const ArtistRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}/:artistId`} render={() => <ArtistDetails />} />
    </>
  );
};

export default ArtistRoutes;
