import React, {useContext, useEffect, useState} from 'react';
import ImageBlockList, {ImageBlockImage} from "../shared/ImageBlock/ImageBlockList";
import {Link} from "react-router-dom";
import SpotifyContext from "../../context/spotify";
import SpotifyApi from "../../api/SpotifyApi";
import {CacheKey, TimeRange} from "../../utils/constants";
import {Button, Icon, SelectPicker} from "rsuite";

const ls = require('localstorage-ttl');

interface TopAlbumsProps {
  timeRange?: TimeRange;
  limit?: number;
}

const topAlbumsTimeRanges = [
  {value: TimeRange.SHORT_TERM, label: 'Last 4 Weeks',},
  {value: TimeRange.MEDIUM_TERM, label: 'Last 6 Months',},
  {value: TimeRange.LONG_TERM, label: 'All-Time',},
];

const TopAlbums = ({limit = 5, timeRange = TimeRange.SHORT_TERM}: TopAlbumsProps) => {
  const [topAlbumsImages, setTopAlbumsImages] = useState<ImageBlockImage[]>([]);
  const [topAlbumsTimeRange, setTopAlbumsTimeRange] = useState<TimeRange>(timeRange);
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getTopAlbums(limit, topAlbumsTimeRange).then(albums => {
      const images: ImageBlockImage[] = [];

      albums.forEach((album: any) => {
        images.push({
          url: album.images[0].url,
          title: <Link to={`album/${album.id}`}>{album.name}</Link>,
          subtitle: album.artists[0].name,
        });
      });

      setTopAlbumsImages(images);
    });
  }, [topAlbumsTimeRange]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Top Albums</h3>
        <SelectPicker
          defaultValue={TimeRange.SHORT_TERM}
          value={topAlbumsTimeRange}
          data={topAlbumsTimeRanges}
          style={{width: 250}}
          cleanable={false}
          searchable={false}
          onChange={(value) => setTopAlbumsTimeRange(value)}
        />
      </div>
      <br/>

      <ImageBlockList images={topAlbumsImages}/>
      <br/>

      <div className="btn-more">
        <Button appearance="primary" size="lg">
          More Albums{' '}
          <Icon icon="long-arrow-right"/>
        </Button>
      </div>
    </>
  );
};

export default TopAlbums;
