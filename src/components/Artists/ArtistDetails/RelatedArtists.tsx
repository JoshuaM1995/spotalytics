import React, {useContext, useEffect, useState} from 'react';
import SpotifyApi from "../../../api/SpotifyApi";
import SpotifyContext from "../../../context/spotify";
import ArtistList from "../../shared/ArtistList";

interface RelatedArtistsProps {
  active: boolean;
  artistId: string;
}

const RelatedArtists = ({ active, artistId }: RelatedArtistsProps) => {
  const [artists, setArtists] = useState<any[]>([]);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    // Only load the related artists when the tab becomes active, and if they haven't already been loaded
    if(active && artists.length === 0) {
      const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
      spotifyApi.getRelatedArtists(artistId).then((relatedArtists: any) => {
        setArtists(relatedArtists);
      });
    }
  }, [active]);

  return <ArtistList artists={artists} />
};

export default RelatedArtists;
