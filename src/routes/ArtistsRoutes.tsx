import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import TopArtists from "../components/Artists/TopArtists/TopArtists";
import AllArtists from "../components/Artists/AllArtists/AllArtists";

const ArtistsRoutes = () => {
  const match = useRouteMatch();

  return (
      <>
        <Route path={`${match.path}/top`} render={() => <TopArtists />} />
        <Route path={`${match.path}/all`} render={() => <AllArtists />} />
      </>
  );
};

export default ArtistsRoutes;
