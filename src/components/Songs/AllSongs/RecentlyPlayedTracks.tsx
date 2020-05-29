import React, {useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {Table} from "rsuite";
import moment from 'moment';
import TablePagination from "rsuite/es/Table/TablePagination";
const Chance = require('chance');

interface RecentlyPlayedTrack {
  track: string;
  artists: string;
  playedAt: any;
}

const chance = new Chance();

const { Column, HeaderCell, Cell } = Table;

const RecentlyPlayedTracks = () => {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<RecentlyPlayedTrack[]>([]);
  const [page, setPage] = useState(1);
  const [displayLength, setDisplayLength] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    for(let i = 0; i < 100; i++) {
      setRecentlyPlayedTracks(artists => [
        ...artists,
        {
          track: chance.sentence({ words: 5 }),
          artists: chance.name(),
          playedAt: moment(chance.date()).format('MMMM Do, YYYY [at] h:mm A'),
        }
      ]);
    }
  }, []);

  const getData = () => {
    return recentlyPlayedTracks.filter((v: RecentlyPlayedTrack, i: number) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  }

  return (
    <Page title="Recently Played Tracks">
      <Table
        height={1080}
        data={getData()}
        loading={loading}
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
        onChangePage={(dataKey) => setPage(dataKey)}
        onChangeLength={(dataKey) => setDisplayLength(dataKey)}
      />
    </Page>
  );
};

export default RecentlyPlayedTracks;
