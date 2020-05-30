import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import {Container} from 'rsuite';
import SideNavigation from './components/Navigation/SideNavigation/SideNavigation';
import SpotifyContext, {spotifyContextDefaultValue} from './context/spotify';
import Authenticate from "./components/Authenticate/Authenticate";
import {GuardProvider, GuardedRoute} from 'react-router-guards';
import NotFound from "./components/Error/NotFound";
import Loading from "./components/Loading/Loading";
import ArtistsRoutes from "./router/routes/ArtistsRoutes";
import AlbumsRoutes from "./router/routes/AlbumsRoutes";
import TracksRoutes from "./router/routes/TracksRoutes";
import Home from "./components/Home/Home";
import Unauthenticated from "./components/Authenticate/Unauthenticated";
import './styles/_global.scss';
import {SPOTIFY_CONTEXT} from "./constants";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";

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
          next.redirect('/authenticate');
        }
      } else {
        next.redirect('/authenticate');
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
              <GuardedRoute path={'/dashboard'} component={Dashboard}/>
              <GuardedRoute path="/artists" render={() => <ArtistsRoutes/>}/>
              <GuardedRoute path="/albums" render={() => <AlbumsRoutes/>}/>
              <GuardedRoute path="/tracks" render={() => <TracksRoutes/>}/>
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
