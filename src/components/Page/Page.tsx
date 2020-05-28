import React, {PropsWithChildren, ReactNode} from 'react';
import {Container, Content, Header} from "rsuite";
import {contentStyles, headerStyles} from "../../styles";

interface PageProps {
  title: ReactNode;
}

const Page = ({ title, children }: PropsWithChildren<PageProps>) => {
  return (
    <Container>
      <Header style={headerStyles}>
        { title }
      </Header>
      <Content style={contentStyles}>
        { children }
      </Content>
    </Container>
  );
};

export default Page;
