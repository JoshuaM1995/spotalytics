import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import TopArtists from "../components/Artists/TopArtists/TopArtists";
import FollowedArtists from "../components/Artists/FollowedArtists/FollowedArtists";

const ArtistsRoutes = () => {
  const match = useRouteMatch();

  return (
      <>
        <Route exact path={`${match.path}/top`} render={() => <TopArtists />} />
        <Route exact path={`${match.path}/followed`} render={() => <FollowedArtists />} />
      </>
  );
};

export default ArtistsRoutes;
