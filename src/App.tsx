import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import NoMatch from './components/NoMatch/NoMatch';
import {Container} from 'rsuite';
import SideNavigation from './components/Navigation/SideNavigation/SideNavigation';
import ArtistsRoutes from "./routes/ArtistsRoutes";
import SpotifyContext, {spotifyContextDefaultValue} from './context/spotify';

export const dashboardRoutes = ['/', '/dashboard'];

const App = () => {
  const [spotifyContext, setSpotifyContext] = useState(spotifyContextDefaultValue);
  const value = { spotifyContext: spotifyContext, setSpotifyContext: setSpotifyContext };

  return (
    <SpotifyContext.Provider value={value}>
      <Container>
        <BrowserRouter>
          <SideNavigation />

          <Switch>
            <Route exact path={dashboardRoutes} component={Dashboard} />
            <Route path="/artists" render={() => <ArtistsRoutes />} />
            <Route>
              {/* 404 Page */}
              <NoMatch />
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </SpotifyContext.Provider>
  );
};

export default App;
