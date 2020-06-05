import React, {ComponentProps, ReactElement} from 'react';
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
          {albums.map((album: any, index: number) => (
            <FlexboxGrid.Item componentClass={Col} xs={24} sm={12} md={6} key={index} className="album-card-container">
              <Panel bodyFill className="album-card">
                <Link to={`/album/${album.album.id}`}>
                  <img src={album.album.images[0].url} alt="" />
                </Link>
                <Panel className="album-info">
                  <h6>
                    <Link to={`/album/${album.album.id}`}>
                      { album.album.name }
                    </Link>
                  </h6>
                  <Link to={`/artist/${album.album.artists[0].id}`} className="link-slim">
                    { album.album.artists[0].name }
                  </Link>
                </Panel>
              </Panel>
            </FlexboxGrid.Item>
          ))}
      </FlexboxGrid>
    </ConditionalWrapper>
  );
};

export default AlbumGrid;
