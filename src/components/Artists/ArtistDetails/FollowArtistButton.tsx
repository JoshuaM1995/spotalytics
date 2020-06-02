import React, {useContext, useEffect, useReducer, useState} from "react";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import {IconButton} from "rsuite";
import {FollowingButtonAction} from "../../../actions/followingButtonAction";
import followingButtonReducer, { initialFollowingButtonState } from "../../../reducers/followingButtonReducer";

interface FollowingArtistButtonProps {
  artistId: string;
  setFollowers: React.Dispatch<React.SetStateAction<number>>;
}

const FollowArtistButton = ({ artistId, setFollowers }: FollowingArtistButtonProps) => {
  const [ isUserFollowing, setIsUserFollowing ] = useState(false);
  const [ buttonState, buttonDispatch ] = useReducer(followingButtonReducer, initialFollowingButtonState);
  const { spotifyContext } = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    spotifyApi.getIsCurrentUserFollowingArtists([artistId]).then((isFollowing: any) => {
      setIsUserFollowing(isFollowing[0]);
    });
  }, []);

  useEffect(() => {
    if(isUserFollowing) {
      buttonDispatch({ type: FollowingButtonAction.FOLLOWING });
    }
  }, [isUserFollowing]);

  const followArtist = () => {
    spotifyApi.putFollowArtists([artistId]).then(() => {
      setIsUserFollowing(true);
    });
    setFollowers((followers) => followers + 1);
  };

  const unFollowArtist = () => {
    spotifyApi.putUnFollowArtists([artistId]).then(() => {
      setIsUserFollowing(false);
    });
    setFollowers((followers) => followers - 1);
  }

  const onMouseEnter = () => {
    if(isUserFollowing) {
      buttonDispatch({ type: FollowingButtonAction.FOLLOWING_HOVER });
    }
  };

  const onMouseLeave = () => {
    buttonDispatch({
      type: isUserFollowing ? FollowingButtonAction.FOLLOWING : FollowingButtonAction.NOT_FOLLOWING,
    });
  };

  return (
    <IconButton
      {...buttonState.props}
      size="lg"
      onClick={isUserFollowing ? unFollowArtist :  followArtist}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      { buttonState.text }
    </IconButton>
  );
};

export default FollowArtistButton;
