import React, { useContext, useState } from 'react';
import Page from "../../Page/Page";
import { useParams } from "react-router";
import { Badge, Col, Icon, IconButton, Panel, Rate, Row, Table } from "rsuite";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import './AlbumDetails.scss';
import { Link } from "react-router-dom";
import { getTrackLength } from "../../../utils/track";
import axios from "axios";
import { AUDIODB_BASE_URL } from "../../../utils/constants";
import useAsyncEffect from "../../../hooks/useAsyncEffect";

const { Column, HeaderCell, Cell } = Table;
const TrackNumberCell = ({ rowData, dataKey, ...props }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Cell
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {
        hovered ? <a href={rowData.uri}>
          <Icon icon="play-circle" size="2x" style={{ marginTop: '-5px', marginLeft: '-5px' }} />
        </a> : rowData[dataKey]
      }
    </Cell>
  );
};

const ExplicitCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props}>
    {rowData[dataKey] ? <Badge content="Explicit" /> : ''}
  </Cell>
);

const DurationCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props}>{getTrackLength(rowData[dataKey])}</Cell>
);

const SimilarTracksCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props}>
    <Link to={`/discover/similar-tracks/${rowData[dataKey]}`}>
      <IconButton icon={<Icon icon="music" />} color="red">Similar Tracks</IconButton>
    </Link>
  </Cell>
);

interface AlbumsDetailsParams {
  albumId: string;
}

const AlbumDetails = () => {
  const { albumId } = useParams<AlbumsDetailsParams>();
  const { spotifyContext } = useContext(SpotifyContext);
  const [albumInfo, setAlbumInfo] = useState<any>();
  const [albumScore, setAlbumScore] = useState<number>();

  useAsyncEffect(async () => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    const album = await spotifyApi.getAlbumInfo(albumId);
    setAlbumInfo(album);

    // Get album ratings
    const getAlbumInfo = await axios.get(
      `${AUDIODB_BASE_URL}/searchalbum.php?s=${album.artists[0].name}&a=${album.name}`,
      { headers: null },
    );

    if (getAlbumInfo.data.album) {
      const albumInfo = getAlbumInfo.data.album[0];
      setAlbumScore(albumInfo.intScore > 0 ? albumInfo.intScore : 0);
    }
  }, [albumId, spotifyContext.accessToken]);

  return (
    <Page>
      <Row>
        <Col md={3} />
        <Col md={18}>
          <Panel shaded bordered bodyFill className="panel-light">
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', }}>
              <img
                src={albumInfo?.images[0].url}
                alt={albumInfo?.name}
                title={albumInfo?.name}
                style={{ width: '400px', height: '400px', position: 'relative' }}
              />
            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Rate value={albumScore} max={10} readOnly />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {!albumScore && <>No album ratings found.</>}
            </div>
            <br />
            <h1 style={{ textAlign: 'center' }}>
              {albumInfo?.name}
            </h1>
            <h2 style={{ textAlign: 'center', fontWeight: 'normal' }}>
              <Link to={`/artist/${albumInfo?.artists[0].id}`}>{albumInfo?.artists[0].name}</Link>
            </h2>
            <Panel>
              <Table
                height={(albumInfo?.tracks.items.length + 1) * 46}
                data={albumInfo?.tracks.items}
                wordWrap
              >
                <Column width={70} align="left">
                  <HeaderCell>#</HeaderCell>
                  <TrackNumberCell dataKey="track_number" />
                </Column>

                <Column resizable width={200} align="left">
                  <HeaderCell>Track Name</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column align="right">
                  <HeaderCell />
                  <ExplicitCell dataKey="explicit" />
                </Column>

                <Column>
                  <HeaderCell>Length</HeaderCell>
                  <DurationCell dataKey="duration_ms" />
                </Column>

                <Column width={150} align="right">
                  <HeaderCell></HeaderCell>
                  <SimilarTracksCell dataKey="id" />
                </Column>
              </Table>
              <br />
              {albumInfo?.copyrights[0].text}
            </Panel>
          </Panel>
        </Col>
        <Col md={3} />
      </Row>
    </Page>
  );
};

export default AlbumDetails;
