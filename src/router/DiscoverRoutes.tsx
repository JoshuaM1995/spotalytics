import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import Recommendations from '../components/Recommendations/Recommendations';
import SimilarAlbums from '../components/Recommendations/SimilarAlbums/SimilarAlbums';
import SimilarTracks from '../components/Recommendations/SimilarTracks/SimilarTracks';

const DiscoverRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
    <Route exact path={`${match.path}/`} render={() => <Recommendations />} />
      <Route exact path={`${match.path}/similar-tracks`} render={() => <SimilarTracks />} />
      <Route exact path={`${match.path}/similar-albums`} render={() => <SimilarAlbums />} />
    </>
  );
};

export default DiscoverRoutes;
