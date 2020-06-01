import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {useParams} from "react-router";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import {Content, Icon, Nav, Panel, Progress} from "rsuite";
import {getLineStatus} from "../../../utils/progress";
import './ArtistDetails.scss';
import ArtistAlbums from "./ArtistAlbums";
import RelatedArtists from "./RelatedArtists";
import ArtistBio from "./ArtistBio";
import {numberWithCommas} from "../../../utils/global";

enum Tab {
  ALBUMS = 'ALBUMS',
  TOP_TRACKS = 'TOP_TRACKS',
  RELATED_ARTISTS = 'RELATED_ARTISTS',
  INFO = 'INFO',
}

const ArtistDetails = () => {
  const {artistId} = useParams();
  const {spotifyContext} = useContext(SpotifyContext);
  const [artistInfo, setArtistInfo] = useState<any>();
  const [activeTab, setActiveTab] = useState(Tab.ALBUMS);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getArtistInfo(artistId).then((artist: any) => {
      setArtistInfo(artist);
    });
  }, []);

  const handleSelect = (activeKey: Tab) => {
    setActiveTab(activeKey);
  };

  return (
    <Page>
      <Panel shaded bordered bodyFill className="panel-light">
        <br/>
        <div style={{display: 'flex', justifyContent: 'center',}}>
          <img
            src={artistInfo?.images[0].url}
            alt={artistInfo?.name}
            title={artistInfo?.name}
            style={{width: '400px', height: '400px', position: 'relative'}}
          />
        </div>
        <br/>
        <div style={{width: '400px', margin: '0 auto'}}>
          <h2 style={{textAlign: 'center'}}>{ artistInfo?.name }</h2>
          <h5 className="text-slim" style={{ textAlign: 'center' }}>
            <Icon icon="user-plus" />{' '}
            { numberWithCommas(artistInfo?.followers.total ?? 0) } Followers
          </h5>
        </div>
        <br/>

        <div style={{padding: '0 20px'}}>
          <Nav appearance="subtle" justified>
            <Nav.Item
              active={activeTab === Tab.ALBUMS}
              icon={<Icon icon="play-circle"/>}
              onClick={() => handleSelect(Tab.ALBUMS)}
            >
              Albums
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.TOP_TRACKS}
              icon={<Icon icon="globe"/>}
              onClick={() => handleSelect(Tab.TOP_TRACKS)}
            >
              Top Tracks
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.RELATED_ARTISTS}
              icon={<Icon icon="user"/>}
              onClick={() => handleSelect(Tab.RELATED_ARTISTS)}
            >
              Related Artists
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.INFO}
              icon={<Icon icon="info-circle"/>}
              onClick={() => handleSelect(Tab.INFO)}
            >
              Info
            </Nav.Item>
          </Nav>

          <Content style={{display: (activeTab === Tab.ALBUMS) ? 'block' : 'none', marginTop: '20px'}}>
            <ArtistAlbums artistId={artistId} active />
            <br />
          </Content>

          <Content style={{display: (activeTab === Tab.TOP_TRACKS) ? 'block' : 'none', marginTop: '20px'}}>
            Top Tracks Map
          </Content>

          <Content style={{display: (activeTab === Tab.RELATED_ARTISTS) ? 'block' : 'none', marginTop: '20px'}}>
            <RelatedArtists artistId={artistId} active={activeTab === Tab.RELATED_ARTISTS} />
            <br />
          </Content>

          <Content style={{display: (activeTab === Tab.INFO) ? 'block' : 'none', marginTop: '20px'}}>
            <ArtistBio artistName={artistInfo?.name} active={activeTab === Tab.INFO} />
          </Content>
        </div>
      </Panel>
    </Page>
  );
};

export default ArtistDetails;
