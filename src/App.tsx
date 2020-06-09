import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import {Container} from 'rsuite';
import SideNavigation from './components/Navigation/SideNavigation/SideNavigation';
import SpotifyContext, {spotifyContextDefaultValue} from './context/spotify';
import AuthenticateSpotify from "./components/AuthenticateSpotify/AuthenticateSpotify";
import {GuardProvider, GuardedRoute} from 'react-router-guards';
import NotFound from "./components/Error/NotFound";
import Loading from "./components/Loading/Loading";
import ArtistsRoutes from "./router/ArtistsRoutes";
import AlbumsRoutes from "./router/AlbumsRoutes";
import TracksRoutes from "./router/TracksRoutes";
import Home from "./components/Home/Home";
import UnauthenticatedSpotify from "./components/AuthenticateSpotify/UnauthenticatedSpotify";
import './App.scss';
import {SPOTIFY_CONTEXT} from "./constants";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";
import ArtistRoutes from "./router/ArtistRoutes";
import AlbumRoutes from "./router/AlbumRoutes";
import Recommendations from "./components/Recommendations/Recommendations";

const App = () => {
  const [spotifyContext, setSpotifyContext] = useState(spotifyContextDefaultValue);
  const value = {spotifyContext: spotifyContext, setSpotifyContext: setSpotifyContext};

  const authenticateGuard = (to: any, from: any, next: any) => {
    if(!spotifyContext.isAuthenticated) {
      let sessionStorageSpotify: any = sessionStorage.getItem(SPOTIFY_CONTEXT);

      if(sessionStorageSpotify !== null) {
        sessionStorageSpotify = JSON.parse(sessionStorageSpotify ?? '');

        // If the spotify context is in session storage set the spotify context to
        // the value of what's in session storage
        if(sessionStorageSpotify) {
          setSpotifyContext({ ...spotifyContext, ...sessionStorageSpotify });
        } else {
          next.redirect('/authenticate-spotify');
        }
      } else {
        next.redirect('/authenticate-spotify');
      }
    }

    next();
  };

  return (
    <SpotifyContext.Provider value={value}>
      <Container>
        <BrowserRouter>
          <SideNavigation/>

          <GuardProvider guards={[authenticateGuard]} loading={Loading} error={SomethingWentWrong}>
            <Switch>
              <Route exact path="/" component={Home} />
              <GuardedRoute path="/dashboard" component={Dashboard} />
              <GuardedRoute path="/recommendations" component={Recommendations} />
              <GuardedRoute path="/artist" render={() => <ArtistRoutes/>} />
              <GuardedRoute path="/artists" render={() => <ArtistsRoutes/>} />
              <GuardedRoute path="/album" render={() => <AlbumRoutes/>} />
              <GuardedRoute path="/albums" render={() => <AlbumsRoutes/>} />
              <GuardedRoute path="/tracks" render={() => <TracksRoutes/>} />
              <GuardedRoute exact path="/authenticate-spotify" component={AuthenticateSpotify} />
              <GuardedRoute exact path="/authenticate-spotify/:action" component={AuthenticateSpotify} />
              <GuardedRoute path="/unauthenticated-spotify" component={UnauthenticatedSpotify} />
              <Route path="*">
                <NotFound/>
              </Route>
            </Switch>
          </GuardProvider>
        </BrowserRouter>
      </Container>
    </SpotifyContext.Provider>
  );
};

export default App;
