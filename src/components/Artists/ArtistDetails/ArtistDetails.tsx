import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {useParams} from "react-router";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import {Col, Content, Icon, Nav, Panel, Row, Placeholder} from "rsuite";
import './ArtistDetails.scss';
import ArtistAlbums from "./ArtistAlbums";
import RelatedArtists from "./RelatedArtists";
import ArtistBiography from "./ArtistBiography";
import {numberWithCommas} from "../../../utils/global";
import ArtistTopTracks from "./ArtistTopTracks";
import FollowArtistButton from "./FollowArtistButton";

enum Tab {
  ALBUMS = 'ALBUMS',
  TOP_TRACKS = 'TOP_TRACKS',
  RELATED_ARTISTS = 'RELATED_ARTISTS',
  BIOGRAPHY = 'BIOGRAPHY',
}

const ArtistDetails = () => {
  const {artistId} = useParams();
  const {spotifyContext} = useContext(SpotifyContext);
  const [artistInfo, setArtistInfo] = useState<any>();
  const [activeTab, setActiveTab] = useState(Tab.ALBUMS);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getArtistInfo(artistId).then((artist: any) => {
      setArtistInfo(artist);
      setFollowers(artist.followers.total);
    });
  }, []);

  const changeTab = (activeKey: Tab) => {
    setActiveTab(activeKey);
  };

  return (
    <Page>
      <Panel shaded bordered bodyFill className="panel-light">
        <br/>
        <div style={{display: 'flex', justifyContent: 'center',}}>
          {!artistInfo &&
          <Placeholder.Graph active style={{width: '400px', height: '400px', position: 'relative'}} />}
          {artistInfo &&
          <img
            src={artistInfo.images[0].url}
            alt={artistInfo.name}
            title={artistInfo.name}
            style={{width: '400px', height: '400px', position: 'relative'}}
          />}
        </div>
        <br/>
        <div style={{width: '400px', margin: '0 auto'}}>
          {!artistInfo && <Placeholder.Paragraph active rows={3} /> }
          {artistInfo &&
          <>
            <h1 style={{textAlign: 'center'}}>{artistInfo.name}</h1>
            <br />
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={24} md={12}>
                <h5 className="text-slim" style={{textAlign: 'center'}}>
                  {numberWithCommas(followers)} Followers
                </h5>
              </Col>

              <Col xs={24} md={12}>
                <FollowArtistButton artistId={artistId} setFollowers={setFollowers} />
              </Col>
            </Row>
          </>}
        </div>
        <br/><br/>

        <div style={{padding: '0 20px'}}>
          <Nav appearance="subtle" justified>
            <Nav.Item
              active={activeTab === Tab.ALBUMS}
              icon={<Icon icon="play-circle"/>}
              onClick={() => changeTab(Tab.ALBUMS)}
            >
              Albums
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.TOP_TRACKS}
              icon={<Icon icon="music"/>}
              onClick={() => changeTab(Tab.TOP_TRACKS)}
            >
              Top Tracks
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.RELATED_ARTISTS}
              icon={<Icon icon="user"/>}
              onClick={() => changeTab(Tab.RELATED_ARTISTS)}
            >
              Related Artists
            </Nav.Item>
            <Nav.Item
              active={activeTab === Tab.BIOGRAPHY}
              icon={<Icon icon="info-circle"/>}
              onClick={() => changeTab(Tab.BIOGRAPHY)}
            >
              Biography
            </Nav.Item>
          </Nav>

          <Content style={{display: (activeTab === Tab.ALBUMS) ? 'block' : 'none', marginTop: '20px'}}>
            <ArtistAlbums artistId={artistId} active/>
            <br/>
          </Content>

          <Content style={{display: (activeTab === Tab.TOP_TRACKS) ? 'block' : 'none', marginTop: '20px'}}>
            <ArtistTopTracks artistId={artistId} active={activeTab === Tab.TOP_TRACKS}/>
          </Content>

          <Content style={{display: (activeTab === Tab.RELATED_ARTISTS) ? 'block' : 'none', marginTop: '20px'}}>
            <RelatedArtists artistId={artistId} active={activeTab === Tab.RELATED_ARTISTS}/>
            <br/>
          </Content>

          <Content style={{display: (activeTab === Tab.BIOGRAPHY) ? 'block' : 'none', marginTop: '20px'}}>
            <ArtistBiography artistName={artistInfo?.name} active={activeTab === Tab.BIOGRAPHY}/>
          </Content>
        </div>
      </Panel>
    </Page>
  );
};

export default ArtistDetails;
