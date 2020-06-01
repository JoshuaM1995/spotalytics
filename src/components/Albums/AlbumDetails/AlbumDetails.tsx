import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {useParams} from "react-router";
import {Badge, Col, Icon, List, Panel, Row, Table} from "rsuite";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import moment from "moment";
import './AlbumDetails.scss';
import {Link} from "react-router-dom";

const {Column, HeaderCell, Cell} = Table;
const getLength = (durationInMs: number) => {
  const duration = moment.duration(durationInMs);
  const zero = duration.seconds() < 10 ? '0' : '';

  return `${duration.minutes()}:${zero}${duration.seconds()}`;
}

const TrackNumberCell = ({rowData, dataKey, ...props}: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Cell
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {
        hovered ? <a href={rowData.uri}>
          <Icon icon="play-circle" size="2x" style={{marginTop: '-5px', marginLeft: '-5px'}}/>
        </a> : rowData[dataKey]
      }
    </Cell>
  );
};

const DurationCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>{getLength(rowData[dataKey])}</Cell>
);

const ExplicitCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>
    {rowData[dataKey] ? <Badge content="Explicit"/> : ''}
  </Cell>
);

const AlbumDetails = () => {
  const {albumId} = useParams();
  const {spotifyContext} = useContext(SpotifyContext);
  const [albumInfo, setAlbumInfo] = useState<any>();

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getAlbumInfo(albumId).then((album: any) => {
      setAlbumInfo(album);
    });
  }, []);

  return (
    <Page>
      <Row>
        <Col md={3}/>
        <Col md={18}>
          <Panel shaded bordered bodyFill className="panel-light">
            <br/>
            <div style={{display: 'flex', justifyContent: 'center',}}>
              <img
                src={albumInfo?.images[0].url}
                alt={albumInfo?.name}
                title={albumInfo?.name}
                style={{width: '400px', height: '400px', position: 'relative'}}
              />
            </div>
            <br />
            <h1 style={{textAlign: 'center'}}>
              { albumInfo?.name }
            </h1>
            <h2 style={{textAlign: 'center', fontWeight: 'normal'}}>
              <Link to={`/artist/${albumInfo?.artists[0].id}`}>{ albumInfo?.artists[0].name }</Link>
            </h2>
            <Panel>
              <Table
                height={(albumInfo?.tracks.items.length + 1) * 46}
                data={albumInfo?.tracks.items}
              >
                <Column width={70} align="left">
                  <HeaderCell>#</HeaderCell>
                  <TrackNumberCell dataKey="track_number"/>
                </Column>

                <Column resizable width={200} align="left">
                  <HeaderCell>Track Name</HeaderCell>
                  <Cell dataKey="name"/>
                </Column>

                <Column align="right">
                  <HeaderCell>Length</HeaderCell>
                  <DurationCell dataKey="duration_ms"/>
                </Column>

                <Column align="right">
                  <HeaderCell>Explicit</HeaderCell>
                  <ExplicitCell dataKey="explicit"/>
                </Column>
              </Table>
            </Panel>
          </Panel>
        </Col>
        <Col md={3}/>
      </Row>
    </Page>
  );
};

export default AlbumDetails;
