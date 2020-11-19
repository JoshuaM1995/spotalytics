import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import ArtistCountries from '../components/Analytics/ArtistCountries/ArtistCountries';
import TasteProfile from "../components/Analytics/TasteProfile/TasteProfile";

const AnalyticsRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}/artist-countries`} render={() => <ArtistCountries />} />
      <Route exact path={`${match.path}/taste-profile`} render={() => <TasteProfile />} />
    </>
  );
};

export default AnalyticsRoutes;
