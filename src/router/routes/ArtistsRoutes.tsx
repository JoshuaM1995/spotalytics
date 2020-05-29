import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import TopArtists from "../../components/Artists/TopArtists/TopArtists";
import AllArtists from "../../components/Artists/AllArtists/AllArtists";
import RecentlyFollowed from "../../components/Artists/RecentlyFollowed/RecentlyFollowed";

const ArtistsRoutes = () => {
  const match = useRouteMatch();

  return (
      <>
        <Route path={`${match.path}/top`} render={() => <TopArtists />} />
        <Route path={`${match.path}/all`} render={() => <AllArtists />} />
        <Route path={`${match.path}/recently-followed`} render={() => <RecentlyFollowed />} />
      </>
  );
};

export default ArtistsRoutes;
