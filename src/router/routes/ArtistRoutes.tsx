import React from 'react';
import {useRouteMatch} from 'react-router';
import {Route} from 'react-router-dom';
import ArtistDetails from "../../components/Artists/ArtistDetails/ArtistDetails";
import AlbumDetails from "../../components/Albums/AlbumDetails/AlbumDetails";

const ArtistRoutes = () => {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.path}/:artistName`} render={() => <ArtistDetails />} />
      <Route exact path={`${match.path}/:artistName/album/:albumName`} render={() => <AlbumDetails />} />
    </>
  );
};

export default ArtistRoutes;
