import React, {useContext, useEffect, useState} from 'react';
import ImageBlockList, {ImageBlockImage} from "../shared/ImageBlock/ImageBlockList";
import {Link} from "react-router-dom";
import SpotifyContext from "../../context/spotify";
import SpotifyApi from "../../api/SpotifyApi";
import {TimeRange} from "../../utils/constants";
import {Button, Icon, SelectPicker} from "rsuite";

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
  }, [topAlbumsTimeRange, limit]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Top Albums</h3>
        {topAlbumsImages.length > 0 &&
          <SelectPicker
            defaultValue={TimeRange.SHORT_TERM}
            value={topAlbumsTimeRange}
            data={topAlbumsTimeRanges}
            style={{width: 250}}
            cleanable={false}
            searchable={false}
            onChange={(value) => setTopAlbumsTimeRange(value)}
          />
        }
      </div>
      <br/>

      {
        topAlbumsImages.length === 0 &&
        <div style={{ width: '60%', margin: '0 auto', textAlign: 'center' }}>
          <Icon icon="question-circle" size="5x" /><br />
          <h3>Not Enough Data</h3>
          <h5>You haven't listened to enough music to determine your top albums yet. Listen to some more music and try again later.</h5>
        </div>
      }

      {topAlbumsImages.length > 0 &&
        <ImageBlockList images={topAlbumsImages}/>
      }
      <br/>

      {/*<div className="btn-more">*/}
      {/*  <Button appearance="primary" size="lg">*/}
      {/*    More Albums{' '}*/}
      {/*    <Icon icon="long-arrow-right"/>*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
};

export default TopAlbums;
