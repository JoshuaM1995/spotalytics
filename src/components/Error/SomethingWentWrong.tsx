import React from 'react';
import {Icon, IconButton} from "rsuite";
import {Link} from "react-router-dom";
import Page from "../Page/Page";
import './Error.scss';

const SomethingWentWrong = () => {
  return (
    <Page title="Something Went Wrong">
      <div className="jumbotron">
        <h3>An unknown error occurred</h3>
        <br/><br/>
        <Link to="/">
          <IconButton appearance="primary" icon={<Icon icon="home"/>} size="lg">
            Return to Home
          </IconButton>
        </Link>
      </div>
    </Page>
  );
};

export default SomethingWentWrong;
