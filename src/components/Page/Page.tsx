import React, {CSSProperties, PropsWithChildren, useEffect} from 'react';
import {Container, Content, Header} from "rsuite";
import {contentStyles, headerStyles} from "../../styles";

interface PageProps {
  title?: string;
  style?: CSSProperties;
}

const Page = ({ style, title, children }: PropsWithChildren<PageProps>) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_SITE_NAME ?? '';

    if(process.env.REACT_APP_SITE_NAME && title) {
      document.title = `${process.env.REACT_APP_SITE_NAME} - ${title}`;
    }
  }, []);

  return (
    <Container style={style}>
      {title &&
        <Header style={headerStyles}>
          <h2>{title}</h2>
        </Header>
      }
      <Content style={contentStyles}>
        { children }
      </Content>
    </Container>
  );
};

export default Page;
