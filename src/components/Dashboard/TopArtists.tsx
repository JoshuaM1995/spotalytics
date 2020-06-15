import React, {useContext, useEffect, useState} from 'react';
import {TimeRange} from "../../utils/constants";
import ImageBlockList, {ImageBlockImage} from "../shared/ImageBlock/ImageBlockList";
import {Link} from "react-router-dom";
import {numberWithCommas} from "../../utils/global";
import SpotifyContext from "../../context/spotify";
import SpotifyApi from "../../api/SpotifyApi";
import {Button, Icon, Panel, SelectPicker} from "rsuite";

interface TopArtistsProps {
  timeRange?: TimeRange;
  limit?: number;
}

const topArtistsTimeRanges = [
  {value: TimeRange.SHORT_TERM, label: 'Last 4 Weeks',},
  {value: TimeRange.MEDIUM_TERM, label: 'Last 6 Months',},
  {value: TimeRange.LONG_TERM, label: 'All-Time',},
];

const TopArtists = ({limit = 5, timeRange = TimeRange.SHORT_TERM}: TopArtistsProps) => {
  const [topArtistsImages, setTopArtistsImages] = useState<ImageBlockImage[]>([]);
  const [topArtistsTimeRange, setTopArtistsTimeRange] = useState<TimeRange>(timeRange);
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getTopArtists(limit, topArtistsTimeRange).then(artists => {
      const images: ImageBlockImage[] = [];

      artists.forEach((artist: any) => {
        images.push({
          url: artist.images[0].url,
          title: <Link to={`artist/${artist.id}`}>{artist.name}</Link>,
          subtitle: `${numberWithCommas(artist.followers.total)} Followers`
        });
      });

      setTopArtistsImages(images);
    });
  }, [topArtistsTimeRange]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Top Artists</h3>
        <SelectPicker
          defaultValue={TimeRange.SHORT_TERM}
          value={topArtistsTimeRange}
          data={topArtistsTimeRanges}
          style={{width: 250}}
          cleanable={false}
          searchable={false}
          onChange={(value) => setTopArtistsTimeRange(value)}
        />
      </div>
      <br/>

      <ImageBlockList images={topArtistsImages}/>
      <br/>

      <div className="btn-more">
        <Button appearance="primary" size="lg">
          More Artists{' '}
          <Icon icon="long-arrow-right"/>
        </Button>
      </div>
    </>
  );
};

export default TopArtists;
