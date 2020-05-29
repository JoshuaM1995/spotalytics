import React, {PropsWithChildren, useEffect} from 'react';
import {Container, Content, Header} from "rsuite";
import {contentStyles, headerStyles} from "../../styles";

interface PageProps {
  title: string;
}

const Page = ({ title, children }: PropsWithChildren<PageProps>) => {
  useEffect(() => {
    document.title = `Spotics - ${title}`;
  }, []);

  return (
    <Container>
      <Header style={headerStyles}>
        <h2>{ title }</h2>
      </Header>
      <Content style={contentStyles}>
        { children }
      </Content>
    </Container>
  );
};

export default Page;
