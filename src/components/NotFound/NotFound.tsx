import React from 'react';
import {Icon, IconButton} from "rsuite";
import {Link} from "react-router-dom";
import Page from "../Page/Page";
import '../../styles/NotFound.scss';

const NotFound = () => {
  return (
    <Page title="Page Not Found">
      <h3>The page you were looking for could not be found</h3>
      <br/><br/>
      <Link to="/">
        <IconButton appearance="primary" icon={<Icon icon="home"/>} size="lg">
          Return to Home
        </IconButton>
      </Link>
    </Page>
  );
};

export default NotFound;
