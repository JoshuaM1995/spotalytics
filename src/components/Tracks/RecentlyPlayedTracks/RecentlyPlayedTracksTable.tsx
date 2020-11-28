import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon, IconButton, Table } from 'rsuite';
import TablePagination from 'rsuite/lib/Table/TablePagination';
import { UPDATE_PAGE, UPDATE_DISPLAY_LENGTH, IS_NOT_LOADING, UPDATE_DATA, IS_LOADING } from '../../../actions/tableActions';
import tableReducer, { TableState } from '../../../reducers/tableReducer';
import { getFilteredTableData } from '../../../utils/table';
import { RecentlyPlayedTrack } from './RecentlyPlayedTracks';

const { Column, HeaderCell, Cell } = Table;
const initialTableState: TableState<RecentlyPlayedTrack> = {
  data: [],
  page: 1,
  displayLength: 25,
  isLoading: true,
};

const SimilarTracksCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props}>
    <Link to={`/discover/similar-tracks/${rowData[dataKey]}`}>
      <IconButton icon={<Icon icon="music" />} color="red">Similar Tracks</IconButton>
    </Link>
  </Cell>
);

type RecentlyPlayedTracksTableProps = {
  data: RecentlyPlayedTrack[];
  setData: React.Dispatch<React.SetStateAction<RecentlyPlayedTrack[]>>;
  tracks: any;
}

const RecentlyPlayedTracksTable = ({ data, setData, tracks }: RecentlyPlayedTracksTableProps) => {
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const { data: recentlyPlayedTracks, page, displayLength, isLoading } = tableState;

  useEffect(() => {
    tableStateDispatch({ type: IS_LOADING });
  }, []);

  useEffect(() => {
    setData(getFilteredTableData<RecentlyPlayedTrack>(recentlyPlayedTracks, page, displayLength));
    tableStateDispatch({ type: IS_NOT_LOADING });
  }, [recentlyPlayedTracks, page, displayLength]);

  useEffect(() => {
    tableStateDispatch({ type: UPDATE_DATA, value: tracks });

    if (tracks.length > 0) {
      tableStateDispatch({ type: IS_NOT_LOADING });
    }
  }, [tracks]);

  return (
    <>
      <Table
        height={800}
        data={data}
        loading={isLoading}
        className="recently-played-tracks-table"
        wordWrap
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

        <Column width={250}>
          <HeaderCell>Played At</HeaderCell>
          <Cell dataKey="playedAt" />
        </Column>

        <Column width={200} align="right">
          <HeaderCell>Similar Tracks</HeaderCell>
          <SimilarTracksCell dataKey="trackId" />
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
    </>
  );
};

export default RecentlyPlayedTracksTable;
