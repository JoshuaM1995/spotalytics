import React, {useEffect, useReducer, useState} from 'react';
import Page from "../../Page/Page";
import {Table} from "rsuite";
import moment from 'moment';
import TablePagination from "rsuite/es/Table/TablePagination";
import tableReducer, {TableState} from "../../../reducers/tableReducer";
import {IS_NOT_LOADING, UPDATE_DATA, UPDATE_DISPLAY_LENGTH, UPDATE_PAGE} from "../../../actions/tableActions";
import {getFilteredTableData} from "../../../utils/table";

const Chance = require('chance');

interface RecentlyPlayedTrack {
  track: string;
  artists: string;
  playedAt: any;
}

const chance = new Chance();
const { Column, HeaderCell, Cell } = Table;
const initialTableState: TableState<RecentlyPlayedTrack> = {
  data: [],
  page: 1,
  displayLength: 50,
  isLoading: true,
};

const RecentlyPlayedTracks = () => {
  const [data, setData] = useState<RecentlyPlayedTrack[]>([]);
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const { data: recentlyPlayedTracks, page, displayLength, isLoading } = tableState;

  useEffect(() => {
    let tracks: RecentlyPlayedTrack[] = [];

    for(let i = 0; i < 100; i++) {
      tracks.push({
        track: chance.sentence({ words: 5 }),
        artists: chance.name(),
        playedAt: moment(chance.date()).format('MMMM Do, YYYY [at] h:mm A'),
      });
    }

    tableStateDispatch({ type: UPDATE_DATA, value: tracks });
  }, []);

  useEffect(() => {
    setData(getFilteredTableData<RecentlyPlayedTrack>(recentlyPlayedTracks, page, displayLength));
    tableStateDispatch({ type: IS_NOT_LOADING });
  }, [recentlyPlayedTracks, page, displayLength]);

  return (
    <Page title="Recently Played Tracks">
      <Table
        height={800}
        data={data}
        loading={isLoading}
      >
        <Column width={300} align="center">
          <HeaderCell>Track</HeaderCell>
          <Cell dataKey="track" />
        </Column>

        <Column width={200}>
          <HeaderCell>Artist(s)</HeaderCell>
          <Cell dataKey="artists" />
        </Column>

        <Column width={300}>
          <HeaderCell>Played At</HeaderCell>
          <Cell dataKey="playedAt" />
        </Column>
      </Table>

      <TablePagination
        lengthMenu={[
          {
            value: 10,
            label: 10
          },
          {
            value: 50,
            label: 50
          },
          {
            value: 100,
            label: 100
          },
        ]}
        activePage={page}
        displayLength={displayLength}
        total={recentlyPlayedTracks.length}
        onChangePage={(dataKey) => {
          tableStateDispatch({ type: UPDATE_PAGE, value: dataKey })
        }}
        onChangeLength={(dataKey) => {
          tableStateDispatch({ type: UPDATE_DISPLAY_LENGTH, value: dataKey })
        }}
      />
    </Page>
  );
};

export default RecentlyPlayedTracks;
