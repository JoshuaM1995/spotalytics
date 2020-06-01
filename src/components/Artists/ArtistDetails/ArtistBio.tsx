import React, {useEffect, useState} from 'react';
import {nl2br, placeholderItems} from "../../../utils/global";
import {Placeholder} from "rsuite";
import LastFMApi from "../../../api/LastFMApi";

interface ArtistBioProps {
  artistName: string;
  active: boolean;
}

const getArtistInfoMarkup = (html: string) => {
  return {__html: html ? nl2br(html) : html + '<br /><br />'};
}

const lastFMApi = new LastFMApi();

const ArtistBio = ({ artistName, active }: ArtistBioProps) => {
  const [artistInfo, setArtistInfo] = useState<any>(null);

  useEffect(() => {
    // Only load the info when the tab becomes active, and if it hasn't already been loaded
    if(active && !artistInfo) {
      lastFMApi.getArtistInfo(artistName).then((info) => {
        setArtistInfo(info.artist);
      });
    }
  }, [active]);

  return (
    <>
      {!artistInfo && placeholderItems(10).map(() => (
        <Placeholder.Paragraph />
      ))}
      <h3>Biography</h3>
      <br />
      <div dangerouslySetInnerHTML={getArtistInfoMarkup(artistInfo?.bio.content ?? '')}/>
    </>
  );
};

export default ArtistBio;
