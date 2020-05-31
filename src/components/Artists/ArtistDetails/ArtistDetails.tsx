import React, {useContext, useEffect, useState} from 'react';
import Page from "../../Page/Page";
import {useParams} from "react-router";
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import {Badge, Col, Content, FlexboxGrid, Icon, List, Nav, Panel, Progress} from "rsuite";
import {getLineStatus} from "../../../utils/progress";
import {Link} from "react-router-dom";
import moment from 'moment';
import './ArtistDetails.scss';
import {nl2br, numberWithCommas} from "../../../utils/global";

const getArtistInfoMarkup = (html: string) => {
  return {__html: html ? nl2br(html) : html + '<br /><br />'};
}

const ArtistDetails = () => {
  const {artistId} = useParams();
  const {spotifyContext} = useContext(SpotifyContext);
  const [artistInfo, setArtistInfo] = useState<any>();
  const [activeTab, setActiveTab] = useState('albums');

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getArtistInfo(artistId).then((artist: any) => {
      console.log('artist info', artist);
      setArtistInfo(artist);
    });
  }, []);

  const handleSelect = (activeKey: string) => {
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
          <div style={{position: 'absolute'}}>
            <h1 style={{textAlign: 'center'}}>
              {artistInfo?.name}
            </h1>
          </div>
        </div>
        <br/>
        <div style={{width: '400px', margin: '0 auto'}}>
          <h3 style={{textAlign: 'center'}}>Popularity</h3>
          <Progress.Line
            percent={artistInfo?.popularity}
            showInfo={false}
            status={getLineStatus(artistInfo?.popularity)}
          />
        </div>
        <br/>

        <div style={{padding: '0 20px'}}>
          <Nav appearance="subtle" justified>
            <Nav.Item
              active={activeTab === 'albums'}
              icon={<Icon icon="play-circle"/>}
              onClick={() => handleSelect('albums')}
            >
              Albums
            </Nav.Item>
            <Nav.Item
              active={activeTab === 'top-tracks'}
              icon={<Icon icon="globe"/>}
              onClick={() => handleSelect('top-tracks')}
            >
              Top Tracks
            </Nav.Item>
            <Nav.Item
              active={activeTab === 'related-artists'}
              icon={<Icon icon="user"/>}
              onClick={() => handleSelect('related-artists')}
            >
              Related Artists
            </Nav.Item>
            <Nav.Item
              active={activeTab === 'about'}
              icon={<Icon icon="info-circle"/>}
              onClick={() => handleSelect('about')}
            >
              About
            </Nav.Item>
          </Nav>

          <Content
            style={{display: (activeTab === 'about') ? 'block' : 'none', marginTop: '20px'}}
            dangerouslySetInnerHTML={getArtistInfoMarkup(artistInfo?.bio.content)}
          />

          <Content style={{display: (activeTab === 'albums') ? 'block' : 'none', marginTop: '20px'}}>
            <List hover>
              {artistInfo?.albums.map((album: any, index: number) => (
                <Link to={`/album/${album.id}`}>
                  <List.Item key={album.uri} index={index}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item colspan={2} className="center" style={{height: '60px'}}>
                        <img src={album.images[0].url} height={50} width={50} alt={album.name}/>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={16}
                        className="center"
                        style={{
                          height: '60px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden',
                        }}
                      >
                        <div>
                          <div>
                            <h5>{album.name}</h5>
                            <span className="text-slim">
                              {moment(album.release_date).format('MMMM Do, YYYY')}
                            </span>
                          </div>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                </Link>
              ))}
            </List>
            <br/>
          </Content>

          <Content style={{display: (activeTab === 'top-tracks') ? 'block' : 'none', marginTop: '20px'}}>
            Top Tracks Map
          </Content>

          <Content style={{display: (activeTab === 'related-artists') ? 'block' : 'none', marginTop: '20px'}}>
            <List hover>
              {artistInfo?.related_artists.map((artist: any, index: number) => (
                <Link to={`/artist/${artist.id}`}>
                  <List.Item key={artist.uri} index={index}>
                    <FlexboxGrid>
                      <FlexboxGrid.Item
                        colspan={2}
                        className="center"
                        style={{height: '100px', marginLeft: '30px',}}
                      >
                        <img src={artist.images[0].url} height={100} width={100} alt={artist.name}/>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item
                        colspan={16}
                        className="center"
                        style={{
                          height: '100px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          overflow: 'hidden',
                          marginLeft: '40px',
                        }}
                      >
                        <div>
                          <div>
                            <h5 style={{marginBottom: '10px'}}>{artist.name}</h5>
                            {artist.genres.map((genre: any) => {
                              return (
                                <Badge content={genre} className="related-artist-badge"/>
                              );
                            })}
                            <div className="text-slim" style={{marginTop: '10px'}}>
                              {numberWithCommas(artist.followers.total)} Followers
                            </div>
                          </div>
                        </div>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </List.Item>
                </Link>
              ))}
            </List>
            <br/>
          </Content>
        </div>
      </Panel>
    </Page>
  );
};

export default ArtistDetails;
