import { useEffect } from "react";
import { UnknownArtist } from "./ArtistCountries";

interface UnknownArtistsProps {
  artists: UnknownArtist[];
}

// TODO: Implement this feature
const UnknownArtists = ({ artists }: UnknownArtistsProps) => {
  useEffect(() => {
    console.log("Unknown artists", artists);
  }, [artists]);

  return <></>;
};

export default UnknownArtists;
