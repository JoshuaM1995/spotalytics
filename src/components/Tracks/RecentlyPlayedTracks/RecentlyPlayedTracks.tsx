import React, {ReactElement, useContext, useEffect, useReducer, useState} from 'react';
import Page from "../../Page/Page";
import {Badge, Table} from "rsuite";
import TablePagination from "rsuite/es/Table/TablePagination";
import tableReducer, {TableState} from "../../../reducers/tableReducer";
import {IS_LOADING, IS_NOT_LOADING, UPDATE_DATA, UPDATE_DISPLAY_LENGTH, UPDATE_PAGE} from "../../../actions/tableActions";
import {getFilteredTableData} from "../../../utils/table";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import moment from 'moment';
import './RecentlyPlayedTracks.scss';
import {Link} from "react-router-dom";

interface RecentlyPlayedTrack {
  track: string;
  artists: string;
  playedAt: any;
}

const { Column, HeaderCell, Cell } = Table;
const initialTableState: TableState<RecentlyPlayedTrack> = {
  data: [],
  page: 1,
  displayLength: 25,
  isLoading: true,
};

const RecentlyPlayedTracks = () => {
  const [data, setData] = useState<RecentlyPlayedTrack[]>([]);
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const [tracks, setTracks] = useState<any>([]);
  const { data: recentlyPlayedTracks, page, displayLength, isLoading } = tableState;
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    tableStateDispatch({ type: IS_LOADING });
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getRecentlyPlayedTracks(50, true).then((recentlyPlayedTracks: any[]) => {
      tableStateDispatch({ type: IS_NOT_LOADING });
      const tracksToAdd: any[] = [];

      recentlyPlayedTracks.forEach((recentlyPlayedTrack: any) => {
        const artists: ReactElement[] = [];
        let trackToAdd: {
          isPlaying: ReactElement|string;
          artists: ReactElement[]|string[];
          playedAt: string;
          trackName: ReactElement|string
        };

        if(recentlyPlayedTrack.item) {
          recentlyPlayedTrack.item.artists.forEach((artist: any) => {
            artists.push(<><Link to={`/artist/${artist.id}`}>{ artist.name }</Link>{', '}</>);
          });

          trackToAdd = {
            isPlaying: recentlyPlayedTrack.is_playing ? <Badge content="Playing" className="badge-playing" />
                                                      : <Badge content="Not Playing" className="badge-not-playing" />,
            trackName: <a href={recentlyPlayedTrack.item.uri}>{ recentlyPlayedTrack.item.name }</a>,
            artists: [],
            playedAt: moment(recentlyPlayedTrack.timestamp).format('MMMM Do, YYYY [at] h:mm A'),
          };
        } else {
          recentlyPlayedTrack.track.artists.forEach((artist: any) => {
            artists.push(<><Link to={`/artist/${artist.id}`}>{ artist.name }</Link>{', '}</>);
          });

          trackToAdd = {
            isPlaying: '',
            trackName: <a href={recentlyPlayedTrack.track.uri}>{ recentlyPlayedTrack.track.name }</a>,
            artists: [],
            playedAt: moment(recentlyPlayedTrack.played_at).format('MMMM Do, YYYY [at] h:mm A'),
          };
        }

        trackToAdd.artists = artists;
        tracksToAdd.push(trackToAdd);
      });

      setTracks(tracksToAdd);
    });
  }, []);

  useEffect(() => {
    setData(getFilteredTableData<RecentlyPlayedTrack>(recentlyPlayedTracks, page, displayLength));
    tableStateDispatch({ type: IS_NOT_LOADING });
  }, [recentlyPlayedTracks, page, displayLength]);

  useEffect(() => {
    tableStateDispatch({ type: UPDATE_DATA, value: tracks });
  }, [tracks]);

  return (
    <Page title="Recently Played Tracks">
      <Table
        height={800}
        data={data}
        loading={isLoading}
      >
        <Column width={100} align="center">
          <HeaderCell />
          <Cell dataKey="isPlaying" />
        </Column>

        <Column width={400}>
          <HeaderCell>Track Name</HeaderCell>
          <Cell dataKey="trackName" />
        </Column>

        <Column width={300}>
          <HeaderCell>Artist(s)</HeaderCell>
          <Cell dataKey="artists" />
        </Column>

        <Column width={200} align="right">
          <HeaderCell>Played At</HeaderCell>
          <Cell dataKey="playedAt" />
        </Column>
      </Table>

      <TablePagination
        lengthMenu={[
          { value: 10, label: 10 },
          { value: 25, label: 25 },
          { value: 50, label: 50 },
        ]}
        activePage={page}
        displayLength={displayLength}
        total={recentlyPlayedTracks.length}
        onChangePage={(dataKey) => tableStateDispatch({ type: UPDATE_PAGE, value: dataKey })}
        onChangeLength={(dataKey) => tableStateDispatch({ type: UPDATE_DISPLAY_LENGTH, value: dataKey })}
      />
    </Page>
  );
};

export default RecentlyPlayedTracks;
