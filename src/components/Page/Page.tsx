import React, { CSSProperties, PropsWithChildren, useEffect } from "react";
import { Container, Content, Header } from "rsuite";

interface PageProps {
  title?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}

const Page = ({
  title,
  style,
  contentStyle,
  children,
}: PropsWithChildren<PageProps>) => {
  useEffect(() => {
    document.title = import.meta.env.VITE_SITE_NAME ?? "";

    if (import.meta.env.VITE_SITE_NAME && title) {
      document.title = `${import.meta.env.VITE_SITE_NAME} - ${title}`;
    }
  }, [title]);

  return (
    <Container style={style}>
      {title && (
        <Header className="page-header">
          <h2>{title}</h2>
        </Header>
      )}
      <Content className="page-content" style={contentStyle}>
        {children}
      </Content>
    </Container>
  );
};

export default Page;
