import React, {useContext, useEffect, useRef, useState} from "react";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import {Icon, IconButton} from "rsuite";
import {IconButtonProps} from "rsuite/es/IconButton";

interface FollowingArtistButtonProps {
  artistId: string;
}

const FollowArtistButton = ({ artistId }: FollowingArtistButtonProps) => {
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [buttonText, setButtonText] = useState('Follow Artist');
  const [buttonProps, setButtonProps] = useState<IconButtonProps>({});
  const { spotifyContext } = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getIsCurrentUserFollowingArtists([artistId]).then((isFollowing: any) => {
      setUserIsFollowing(isFollowing[0]);
    });
  }, []);

  useEffect(() => {
    setButtonText(userIsFollowing ? 'Following Artist' : 'Follow Artist');
    setButtonProps((buttonProps) => {
      return {
        ...buttonProps,
        color: userIsFollowing ? undefined : 'green',
        icon: userIsFollowing ? <Icon icon="user"/> : <Icon icon="user-plus"/>,
      };
    });
  }, [userIsFollowing]);

  const followArtist = () => {
    spotifyApi.putFollowArtists([artistId]).then(() => {
      setUserIsFollowing(true);
    });
  };

  const unFollowArtist = () => {
    spotifyApi.putUnFollowArtists([artistId]).then(() => {
      setUserIsFollowing(false);
    });
  }

  const onMouseEnter = () => {
    if(userIsFollowing) {
      setButtonText('Un-Follow Artist');
      setButtonProps((buttonProps) => {
        return {
          ...buttonProps,
          icon: <Icon icon="user-times" />,
        };
      });
    }
  };

  const onMouseLeave = () => {
    setButtonText(userIsFollowing ? 'Following Artist' : 'Follow Artist');
    setButtonProps((buttonProps) => {
      return {
        ...buttonProps,
        icon: userIsFollowing ? <Icon icon="user"/> : <Icon icon="user-plus"/>,
      };
    });
  };

  return (
    <IconButton
      {...buttonProps}
      size="lg"
      onClick={userIsFollowing ? unFollowArtist :  followArtist}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      { buttonText }
    </IconButton>
  );
};

export default FollowArtistButton;
