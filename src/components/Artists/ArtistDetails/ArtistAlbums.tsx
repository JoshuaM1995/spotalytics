import React, {useContext, useEffect, useState} from 'react';
import {FlexboxGrid, List, Placeholder, TagPicker} from "rsuite";
import {Link} from "react-router-dom";
import moment from "moment";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import {placeholderItems} from "../../../utils/global";

interface ArtistAlbumsProps {
  active: boolean;
  artistId: string;
}

interface AlbumType {
  label: string;
  value: string;
}

const albumTypes: AlbumType[] = [
  { label: 'Full Album', value: 'album' },
  { label: 'Single', value: 'single' },
  { label: 'Appears On', value: 'appears_on' },
  { label: 'Compilation', value: 'compilation' },
];

// const getHiddenAlbums = (albums: any[]) => {
//   return albums.filter((album: any) => album.visible === false);
// };

const ArtistAlbums = ({ active, artistId }: ArtistAlbumsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<any[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    // Only load the albums when the tab becomes active, and if they haven't already been loaded
    if(active && albums.length === 0) {
      const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
      spotifyApi.getArtistsAlbums(artistId).then((artistAlbums: any) => {
        setAlbums(artistAlbums);
        setIsLoading(false);
      });
    }
  }, [active, spotifyContext.accessToken, albums.length, artistId]);

  useEffect(() => {
    console.log('albums', albums);
  }, [albums]);

  const onChangeAlbumType = (selectedAlbumType: string|null): void => {
    setAlbums(albums.map((album: any) => {
      if(selectedAlbumType) {
        if(selectedAlbumType.includes(album.album_type)) {
          return { ...album, visible: true };
        }

        return { ...album, visible: false };
      }

      return { ...album, visible: false };
    }));
  };

  return (
    <>
      {isLoading && <Placeholder.Paragraph active />}
      {!isLoading &&
      <>
        <h5 style={{ marginBottom: 8 }}>Album Types:</h5>
        <TagPicker
          defaultValue={['album', 'single', 'appears_on', 'compilation']}
          placeholder="Select Type"
          data={albumTypes}
          style={{ width: 460 }}
          onChange={onChangeAlbumType}
        />
      </>}
      <br /><br />
      {isLoading &&
      <List>
        {placeholderItems(10).map((num) => (
          <List.Item key={num}>
            <Placeholder.Paragraph active style={{marginLeft: 20, marginTop: 10}} graph="image"/>
          </List.Item>
        ))}
      </List>}
      {/*{!isLoading && getHiddenAlbums(albums).length > 0 &&*/}
      {/*  <h4 style={{ textAlign: 'center' }}>No albums could be found with the current filters...</h4>*/}
      {/*}*/}
      {!isLoading && albums.length > 0 &&
      <>
        <List hover>
          {albums.map((album: any, index: number) => (
            <Link to={`/album/${album.id}`} key={index} style={{ display: album.visible ? 'block': 'none' }}>
              <List.Item index={index}>
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
      </>}
    </>
  );
};

export default ArtistAlbums;
