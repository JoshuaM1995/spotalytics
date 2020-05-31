import React, {useContext, useEffect, useState} from 'react';
import {FlexboxGrid, List, Placeholder} from "rsuite";
import {Link} from "react-router-dom";
import moment from "moment";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import {placeholderItems} from "../../../utils/global";

interface ArtistAlbumsProps {
  active: boolean;
  artistId: string;
}

const ArtistAlbums = ({ active, artistId }: ArtistAlbumsProps) => {
  const [albums, setAlbums] = useState([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    // Only load the albums when the tab becomes active, and if they haven't already been loaded
    if(active && albums.length === 0) {
      const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
      spotifyApi.getArtistsAlbums(artistId).then((artistAlbums: any) => {
        setAlbums(artistAlbums);
      });
    }
  }, [active]);

  return (
    <>
      <List style={{display: (albums.length > 0) ? 'none' : 'block'}}>
        {placeholderItems(10).map((num) => (
          <List.Item key={num}>
            <Placeholder.Paragraph style={{marginLeft: 20, marginTop: 10}} graph="square"/>
          </List.Item>
        ))}
      </List>
      <List hover>
        {albums?.map((album: any, index: number) => (
          <Link to={`/album/${album.id}`}>
            <List.Item key={album.uri} index={index}>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={2} className="center" style={{height: '60px'}}>
                  <img src={album.images[0].url} height={50} width={50} alt={album.name}/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  colspan={16}
                  className="center"
                  style={{
                    height: '60px',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <div>
                      <h5>{album.name}</h5>
                      <span className="text-slim">
                        {moment(album.release_date).format('MMMM Do, YYYY')}
                      </span>
                    </div>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          </Link>
        ))}
      </List>
    </>
  );
};

export default ArtistAlbums;
