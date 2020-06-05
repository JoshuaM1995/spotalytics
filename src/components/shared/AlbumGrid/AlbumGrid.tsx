import React, {ComponentProps, ReactElement} from 'react';
import {Col, Grid, Panel, Row} from "rsuite";
import './AlbumGrid.scss';
import InfiniteScroll from "react-infinite-scroller";
import ConditionalWrapper from "../ConditionalWrapper";
import {Link} from "react-router-dom";

interface AlbumGridProps {
  albums: any[];
  infiniteScroll?: boolean;
  infiniteScrollProps?: ComponentProps<any>;
}

const AlbumGrid = ({ albums, infiniteScroll, infiniteScrollProps }: AlbumGridProps) => {
  return (
    <ConditionalWrapper
      condition={infiniteScroll}
      wrapper={(children: ReactElement) => <InfiniteScroll {...infiniteScrollProps}>{ children }</InfiniteScroll>}
    >
      <Grid fluid>
        <Row>
          {albums.map((album: any, index: number) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Panel bodyFill className="album-card">
                <Link to={`/album/${album.album.id}`}>
                  <img src={album.album.images[0].url} height="200" alt="" />
                </Link>
                <Panel className="album-info">
                  <h6>
                    <Link to={`/album/${album.album.id}`}>
                      { album.album.name }
                    </Link>
                  </h6>
                  <Link to={`/artist/${album.album.artists[0].id}`} className="artist-name">
                    { album.album.artists[0].name }
                  </Link>
                </Panel>
              </Panel>
            </Col>
          ))}
        </Row>
      </Grid>
    </ConditionalWrapper>
  );
};

export default AlbumGrid;
