import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import AllTracks from "../../components/Songs/AllSongs/AllTracks";
import RecentlyPlayedTracks from "../../components/Songs/AllSongs/RecentlyPlayedTracks";

const TracksRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/all`} render={() => <AllTracks />} />
      <Route path={`${match.path}/recently-played`} render={() => <RecentlyPlayedTracks />} />
    </>
  );
};

export default TracksRoutes;
