import React, {useEffect, useState} from 'react';
import Page from "../../Page/Page";
import LastFMApi from '../../../api/LastFMApi';
import {useParams} from "react-router";
import {AlbumImage, AlbumInfo} from "../../../api/interfaces/responses/lastfm/AlbumInfoResponse";
import {Col, FlexboxGrid, List, Panel, Row} from "rsuite";

const lastFMApi = new LastFMApi();

const getImageBySize = (images: AlbumImage[] | undefined, size: string): AlbumImage | undefined => {
  return images?.filter((image) => {
    return image.size === size;
  }).shift();
};

const AlbumDetails = () => {
  const {artistName, albumName} = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>({
    name: '',
    artist: '',
    url: '',
    image: [],
    listeners: 0,
    playcount: 0,
    tracks: {
      track: [],
    },
    tags: {
      tag: [],
    }
  });

  useEffect(() => {
    lastFMApi.getAlbumInfo(artistName, albumName).then((albumInfo) => {
      setAlbumInfo(albumInfo);
    });
  }, []);

  useEffect(() => {
    console.log('album info', albumInfo);
  }, [albumInfo]);

  return (
    <Page>
      <Row>
        <Col md={6}/>
        <Col md={12}>
          <Panel shaded bordered bodyFill className="panel-light">
            <img src={getImageBySize(albumInfo.image, 'mega')?.["#text"]} />
            <Panel>
              <List hover>
                {[].map((track: any, index: number) => (
                  <List.Item key={track.track_name} index={index}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item colspan={2} className="center" style={{ height: '60px' }}>
                        <img src={track.album_image_url} height={50} width={50} alt={track.album_name} />
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={6}
                        className="center"
                        style={{
                          height: '60px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden',
                        }}
                      >
                        <div className="track-name">{track.track_name}</div>
                        <div>
                          <div>
                            {track.artist}
                          </div>
                        </div>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item colspan={6} className="center" style={{ height: '60px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div className="text-slim">Popularity</div>
                          <div className="popularity">{track.popularity}</div>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                ))}
              </List>
            </Panel>
          </Panel>
        </Col>
        <Col md={6}/>
      </Row>
    </Page>
  );
};

export default AlbumDetails;
