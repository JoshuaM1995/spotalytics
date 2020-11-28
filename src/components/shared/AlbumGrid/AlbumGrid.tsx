import React, {ComponentProps, ReactElement, useEffect} from 'react';
import {Col, FlexboxGrid, Panel} from "rsuite";
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
      <FlexboxGrid justify="center">
          {albums.map((album: any) => {
            return (
              <FlexboxGrid.Item componentClass={Col} xs={24} sm={12} md={4} key={album.id} className="album-card-container">
              <Panel bodyFill className="album-card">
                <Link to={`/album/${album.id}`}>
                  <img src={album.images[0].url} alt="" />
                </Link>
                <Panel className="album-info">
                  <h6>
                    <Link to={`/album/${album.id}`}>
                      { album.name }
                    </Link>
                  </h6>
                  <Link to={`/artist/${album.artists[0].id}`} className="link-slim">
                    { album.artists[0].name }
                  </Link>
                </Panel>
              </Panel>
            </FlexboxGrid.Item>
            );
          })}
      </FlexboxGrid>
    </ConditionalWrapper>
  );
};

export default AlbumGrid;
