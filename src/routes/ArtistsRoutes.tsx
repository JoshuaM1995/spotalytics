import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import TopArtists from "../components/Artists/TopArtists/TopArtists";

const ArtistsRoutes = () => {
  const match = useRouteMatch();

  return (
      <Route path={`${match.path}/top`} render={() => <TopArtists />} />
  );
};

export default ArtistsRoutes;
