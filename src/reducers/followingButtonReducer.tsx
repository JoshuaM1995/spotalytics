import {FollowingButtonAction, FollowingButtonActions} from "../actions/followingButtonActions";
import {Icon} from "rsuite";
import React from "react";
import {IconButtonProps} from "rsuite/es/IconButton";

export interface FollowingButtonState {
  props: any|IconButtonProps;
  text?: string;
}

export const initialFollowingButtonState: FollowingButtonState = {
  props: {
    color: 'green',
    icon: <Icon icon="user-plus" />,
  },
  text: 'Follow Artist',
}

const followingButtonReducer = (state: FollowingButtonState, action: FollowingButtonAction) => {
  switch(action.type) {
    case FollowingButtonActions.FOLLOWING:
      return {
        ...state,
        props: { icon: <Icon icon="user"/> },
        text: 'Following Artist',
      };
    case FollowingButtonActions.FOLLOWING_HOVER:
      return {
        ...state,
        props: { icon: <Icon icon="user-times"/> },
        text: 'Un-Follow Artist',
      };
    case FollowingButtonActions.NOT_FOLLOWING:
      return initialFollowingButtonState;
    default:
      return state;
  }
};

export default followingButtonReducer;
