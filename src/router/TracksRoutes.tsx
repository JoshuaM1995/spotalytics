import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import RecentlyPlayedTracks from "../components/Tracks/RecentlyPlayedTracks/RecentlyPlayedTracks";

const TracksRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.path}/recently-played`} render={() => <RecentlyPlayedTracks />} />
    </>
  );
};

export default TracksRoutes;
