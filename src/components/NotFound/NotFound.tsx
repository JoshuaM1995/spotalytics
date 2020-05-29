import React, {CSSProperties} from 'react';
import {Button, Container, Content, Header, Icon, IconButton} from "rsuite";
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

const NotFound = () => {
  return (
    <Container>
      <Header style={headerStyles}>
        <h2>Page Not Found</h2>
      </Header>
      <Content style={contentStyles}>
        <h3>The page you were looking for could not be found</h3>
        <br /><br />
        <Link to="/">
          <IconButton appearance="primary" icon={<Icon icon="home" />} size="lg">
            Return to Home
          </IconButton>
        </Link>
      </Content>
    </Container>
  );
};

export default NotFound;
