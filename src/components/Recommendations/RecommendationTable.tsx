import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormGroup,
  Icon,
  IconButton, Input,
  Modal,
  Notification,
  Table
} from "rsuite";
import TablePagination from "rsuite/es/Table/TablePagination";
import {UPDATE_DISPLAY_LENGTH, UPDATE_PAGE} from "../../actions/tableActions";
import moment from "moment";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";
import {RecommendedTrack} from "../../utils/types";
import {getTrackLength} from "../../utils/track";
import {Link} from "react-router-dom";
import {TableState} from "../../reducers/tableReducer";
import _ from "lodash";

interface RecommendationTableProps {
  recommendations: RecommendedTrack[];
  tableState: TableState;
  tableStateDispatch: React.Dispatch<any>;
}

const {Column, HeaderCell, Cell} = Table;

const DurationCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>{getTrackLength(rowData[dataKey])}</Cell>
);

const TrackNameCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>
    <a href={rowData.trackUri}>{ rowData[dataKey] }</a>
  </Cell>
);

const ArtistNameCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>
    <Link to={`/artist/${rowData.artistId}`}>{ rowData[dataKey] }</Link>
  </Cell>
);

const AlbumNameCell = ({rowData, dataKey, ...props}: any) => (
  <Cell {...props}>
    <Link to={`/album/${rowData.albumId}`}>{ rowData[dataKey] }</Link>
  </Cell>
);

const initialPlaylistName = `Spotalytics Recommendations Playlist (${moment().format('YYYY-MM-DD')})`;

const RecommendationTable = ({
  recommendations,
   tableState,
   tableStateDispatch,
}: RecommendationTableProps): JSX.Element => {
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
  const {data: recentlyPlayedTracks, page, displayLength, isLoading} = tableState;
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState(initialPlaylistName);

  if(isLoading || recommendations.length === 0) {
    return <></>;
  }

  const saveRecommendationsToPlaylist = () => {
    if(spotifyContext.currentUser) {
      spotifyApi.postPlaylist(
        spotifyContext.currentUser.id,
        playlistName,
        `Automatically generated playlist by Spotalytics on ${moment().format('MMMM Do, YYYY [at] h:mmA')}`,
      ).then((playlist: SpotifyApi.CreatePlaylistResponse) => {
        const trackUris: string[] = [];
        recommendations.forEach((recommendation) => {
          trackUris.push(recommendation.trackUri);
        });

        spotifyApi.postItemsToPlaylist(playlist.id, trackUris).then(() => {
          spotifyApi.getPlaylistById(playlist.id).then((singlePlaylistResponse: SpotifyApi.SinglePlaylistResponse) => {
            Notification.success({
              title: 'Success',
              description: <span>
                               Playlist successfully saved! <a href={singlePlaylistResponse.uri}>Click here</a> to view it.
                           </span>,
              duration: 0,
            });
            setShowModal(false);
          }).catch(() => {
            Alert.success('Playlist successfully saved!', 5000);
            setShowModal(false);
          });
        }).catch(() => {
          Alert.error('Error creating playlist. Please try again.', 5000);
        });
      }).catch(() => {
        Alert.error('Error creating playlist. Please try again.', 5000)
      });
    } else {
      Alert.error('Could not create playlist. Try logging out then back in.', 5000);
    }
  };

  const renamePlaylist = (name: string) => setPlaylistName(name);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          icon={<Icon icon="export"/>}
          placement="left"
          color="blue"
          onClick={() => setShowModal(true)}
        >
          Save as Playlist
        </IconButton>
      </div>
      <Table
        height={800}
        data={recommendations}
        loading={isLoading}
      >
        <Column width={300}>
          <HeaderCell>Track Name</HeaderCell>
          <TrackNameCell dataKey="trackName"/>
        </Column>

        <Column width={200}>
          <HeaderCell>Artist</HeaderCell>
          <ArtistNameCell dataKey="artistName"/>
        </Column>

        <Column width={200}>
          <HeaderCell>Album</HeaderCell>
          <AlbumNameCell dataKey="albumName"/>
        </Column>

        <Column width={100} align="right">
          <HeaderCell>Duration</HeaderCell>
          <DurationCell dataKey="duration"/>
        </Column>
      </Table>

      <TablePagination
        lengthMenu={[
          {value: 10, label: 10},
          {value: 25, label: 25},
          {value: 50, label: 50},
        ]}
        activePage={page}
        displayLength={displayLength}
        total={recentlyPlayedTracks.length}
        onChangePage={(dataKey) => tableStateDispatch({type: UPDATE_PAGE, value: dataKey})}
        onChangeLength={(dataKey) => tableStateDispatch({type: UPDATE_DISPLAY_LENGTH, value: dataKey})}
      />

      {showModal &&
      <Modal backdrop show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Title>
          <h3>Rename Playlist</h3>
        </Modal.Title>
        <Modal.Body>
          <Form fluid>
            <FormGroup>
              <ControlLabel>Playlist Name</ControlLabel>
              <Input
                defaultValue={initialPlaylistName}
                onChange={_.debounce(renamePlaylist, 150)}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveRecommendationsToPlaylist} color="green">
            Save Playlist
          </Button>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
};

export default RecommendationTable;
