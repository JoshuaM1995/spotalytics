import React, {ComponentProps, ReactElement} from 'react';
import {Badge, FlexboxGrid, List, Placeholder} from "rsuite";
import {numberWithCommas, placeholderItems} from "../../../utils/global";
import {Link} from "react-router-dom";
import ConditionalWrapper from "../ConditionalWrapper";
import InfiniteScroll from 'react-infinite-scroller';
import './ArtistList.scss';

interface ArtistListProps {
  artists: any[];
  infiniteScroll?: boolean;
  infiniteScrollProps?: ComponentProps<any>;
}

const ArtistList = ({
  artists,
  infiniteScroll,
  infiniteScrollProps,
}: ArtistListProps) => {
  return (
    <>
      {artists.length === 0 &&
      <List>
        {placeholderItems(10).map((num) => (
          <List.Item key={num}>
            <Placeholder.Paragraph active style={{marginLeft: 20, marginTop: 10}} graph="image"/>
          </List.Item>
        ))}
      </List>}
      <ConditionalWrapper
        condition={infiniteScroll}
        wrapper={(children: ReactElement) => <InfiniteScroll {...infiniteScrollProps}>{ children }</InfiniteScroll>}
      >
        <List bordered hover>
          {artists.map((artist: any, index: number) => (
            <Link to={`/artist/${artist.id}`} className="artist-list">
              <List.Item key={artist.uri} index={index}>
                <FlexboxGrid>
                  <FlexboxGrid.Item
                    colspan={2}
                    className="center"
                    style={{height: '100px', marginLeft: '30px',}}
                  >
                    <img src={artist.images[0].url} height={100} width={100} alt={artist.name}/>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item
                    colspan={16}
                    className="center"
                    style={{
                      height: '100px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                      marginLeft: '40px',
                    }}
                  >
                    <div>
                      <div>
                        <h5 style={{marginBottom: '10px'}}>{artist.name}</h5>
                        {artist.genres.map((genre: any) => {
                          return (
                            <Badge content={genre} className="related-artist-badge"/>
                          );
                        })}
                        <div className="text-slim" style={{marginTop: '10px'}}>
                          {numberWithCommas(artist.followers.total)} Followers
                        </div>
                      </div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </List.Item>
            </Link>
          ))}
        </List>
      </ConditionalWrapper>
    </>
  );
};

export default ArtistList;
