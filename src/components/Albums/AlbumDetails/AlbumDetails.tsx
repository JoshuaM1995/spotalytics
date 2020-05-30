import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {useParams} from "react-router";
import {Badge, Col, List, Panel, Row} from "rsuite";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import moment from "moment";
import './AlbumDetails.scss';

const getLength = (durationInMs: number) => {
  const duration = moment.duration(durationInMs);
  const zero = duration.seconds() < 10 ? '0' : '';

  return `${duration.minutes()}:${zero}${duration.seconds()}`;
}

const AlbumDetails = () => {
  const { albumId } = useParams();
  const { spotifyContext } = useContext(SpotifyContext);
  const [albumInfo, setAlbumInfo] = useState<any>();

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getAlbumInfo(albumId).then((album: any) => {
      setAlbumInfo(album);
    });
  }, []);

  useEffect(() => {
    console.log('album info', albumInfo);
  }, [albumInfo]);

  return (
    <Page>
      <Row>
        <Col md={3}/>
        <Col md={18}>
          <Panel shaded bordered bodyFill className="panel-light">
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', }}>
              <img
                src={albumInfo?.images[0].url}
                alt={albumInfo?.name}
                title={albumInfo?.name}
                style={{ width: '300px', height: '300px' }}
              />
            </div>
            <Panel>
              <h1 style={{ textAlign: 'center' }}>{ albumInfo?.name }</h1>
              <h3 style={{ textAlign: 'center', fontWeight: 'normal' }}>{ albumInfo?.artists[0].name }</h3>
              <br />
              <List hover className="track-list">
                {albumInfo?.tracks.items.map((track: any, index: number) => (
                  <a href={track.uri}>
                    <List.Item key={track.name} index={index}>
                        <div className="track-name">
                          <h5>
                            <Badge content={track.track_number} className="track-number" />
                            {track.name}
                          </h5>
                        </div>
                        <div>
                          <div>
                            {track.artist}
                          </div>
                        </div>
                      <div>
                        <div className="text-slim">Length</div>
                        <div className="duration">{getLength(track.duration_ms)}</div>
                      </div>
                    </List.Item>
                  </a>
                ))}
              </List>
            </Panel>
          </Panel>
        </Col>
        <Col md={3}/>
      </Row>
    </Page>
  );
};

export default AlbumDetails;
