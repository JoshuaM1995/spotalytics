import React from 'react';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import Recommendations from '../components/Discovery/Recommendations';
import SimilarAlbums from '../components/Discovery/SimilarAlbums/SimilarAlbums';
import SimilarTracks from '../components/Discovery/SimilarTracks/SimilarTracks';

const DiscoverRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}/`} render={() => <Recommendations />} />
      <Route exact path={`${match.path}/similar-tracks/:trackId?`} render={() => <SimilarTracks />} />
      <Route exact path={`${match.path}/similar-albums`} render={() => <SimilarAlbums />} />
    </>
  );
};

export default DiscoverRoutes;
