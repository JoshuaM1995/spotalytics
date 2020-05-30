import React, {useEffect, useState} from 'react';
import Page from "../../Page/Page";
import LastFMApi from '../../../api/LastFMApi';
import {useParams} from "react-router";
import {AlbumImage, AlbumInfo} from "../../../api/interfaces/responses/lastfm/AlbumInfoResponse";
import {Col, Panel, Row} from "rsuite";

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
            <img src={getImageBySize(albumInfo.image, 'mega')?.["#text"]} height="240"/>
            <Panel>
              A suite of React components, sensible UI design, and a friendly development experience.
            </Panel>
          </Panel>
        </Col>
        <Col md={6}/>
      </Row>
    </Page>
  );
};

export default AlbumDetails;
