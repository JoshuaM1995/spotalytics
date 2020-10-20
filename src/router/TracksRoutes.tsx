import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import RecentlyPlayedTracks from "../components/Tracks/RecentlyPlayedTracks/RecentlyPlayedTracks";
import FavoritedTracks from "../components/Tracks/FavoritedTracks/FavoritedTracks";
import TopTracks from "../components/Tracks/TopTracks/TopTracks";

const TracksRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}/recently-played`} render={() => <RecentlyPlayedTracks />} />
      <Route exact path={`${match.path}/favorited`} render={() => <FavoritedTracks />} />
      <Route exact path={`${match.path}/top`} render={() => <TopTracks />} />
    </>
  );
};

export default TracksRoutes;
