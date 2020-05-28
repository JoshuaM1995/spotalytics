import React, {CSSProperties} from 'react';
import {Button, Container, Content, Header, Icon} from "rsuite";
import { headerStyles } from '../../styles';
import {Link} from "react-router-dom";

const contentStyles: CSSProperties = {
  background: '#1a1d24',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyles = {
  marginTop: '20px',
};

const NoMatch = () => {
  return (
    <Container>
      <Header style={headerStyles}>
        <h2>Page Not Found</h2>
      </Header>
      <Content style={contentStyles}>
        <h3>The page you were looking for could not be found</h3>
        <Link to="/dashboard">
          <Button appearance="primary" style={buttonStyles}>
            <Icon icon="dashboard" />{' '}
            Return to Dashboard
          </Button>
        </Link>
      </Content>
    </Container>
  );
};

export default NoMatch;
