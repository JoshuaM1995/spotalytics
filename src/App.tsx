import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import NoMatch from './components/NoMatch/NoMatch';
import {Container} from 'rsuite';
import SideNavigation from './components/Navigation/SideNavigation/SideNavigation';
import ArtistsRoutes from "./routes/ArtistsRoutes";

export const dashboardRoutes = ['/', '/dashboard'];

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <SideNavigation />

        <Switch>
          <Route exact path={dashboardRoutes} component={Dashboard} />
          <Route path="/artists" render={() => <ArtistsRoutes />} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
