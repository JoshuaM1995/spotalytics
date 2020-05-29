import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import {Container} from 'rsuite';
import SideNavigation from './components/Navigation/SideNavigation/SideNavigation';
import SpotifyContext, {spotifyContextDefaultValue} from './context/spotify';
import Authenticate from "./components/Authenticate/Authenticate";
import {GuardProvider, GuardedRoute} from 'react-router-guards';
import NotFound from "./components/NotFound/NotFound";
import Loading from "./components/Loading/Loading";
import ArtistsRoutes from "./router/routes/ArtistsRoutes";
import AlbumsRoutes from "./router/routes/AlbumsRoutes";
import SongsRoutes from "./router/routes/SongsRoutes";
import Home from "./components/Home/Home";
import Unauthenticated from "./components/Authenticate/Unauthenticated";

const App = () => {
  const [spotifyContext, setSpotifyContext] = useState(spotifyContextDefaultValue);
  const value = {spotifyContext: spotifyContext, setSpotifyContext: setSpotifyContext};

  useEffect(() => {
    // TODO: Check if authenticated with Spotify via Passport

    // TODO: If authenticated, set spotifyContext.isAuthenticated = true

    // TODO: If not authenticated, open Spotify authentication window
  }, []);

  const authenticateGuard = (to: any, from: any, next: any) => {
    if(!spotifyContext.isAuthenticated) {
      next.redirect('/authenticate');
    }

    next();
  };

  return (
    <SpotifyContext.Provider value={value}>
      <Container>
        <BrowserRouter>
          <SideNavigation/>

          <GuardProvider guards={[authenticateGuard]} loading={Loading} error={NotFound}>
            <Switch>
              <Route exact path="/" component={Home} />
              <GuardedRoute path={'/dashboard'} component={Dashboard}/>
              <GuardedRoute path="/artists" render={() => <ArtistsRoutes/>}/>
              <GuardedRoute path="/albums" render={() => <AlbumsRoutes/>}/>
              <GuardedRoute path="/songs" render={() => <SongsRoutes/>}/>
              <GuardedRoute path="/authenticate" component={Authenticate}/>
              <GuardedRoute path="/unauthenticated" component={Unauthenticated}/>
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
