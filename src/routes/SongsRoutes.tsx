import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import AllSongs from "../components/Songs/AllSongs/AllSongs";

const SongsRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/all`} render={() => <AllSongs />} />
    </>
  );
};

export default SongsRoutes;
