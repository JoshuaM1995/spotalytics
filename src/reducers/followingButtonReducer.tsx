import {FollowingButtonAction, FollowingButtonActions} from "../actions/followingButtonAction";
import {Icon} from "rsuite";
import React from "react";
import {IconButtonProps} from "rsuite/es/IconButton";

export interface FollowingButtonState {
  props: IconButtonProps;
  text?: string;
}

export const initialFollowingButtonState: FollowingButtonState = {
  props: {
    color: 'green',
    icon: <Icon icon="user-plus" />,
  },
  text: 'Follow Artist',
}

const followingButtonReducer = (state: FollowingButtonState, action: FollowingButtonActions) => {
  switch(action.type) {
    case FollowingButtonAction.FOLLOWING:
      return {
        ...state,
        props: { icon: <Icon icon="user"/> },
        text: 'Following Artist',
      };
    case FollowingButtonAction.FOLLOWING_HOVER:
      return {
        ...state,
        props: { icon: <Icon icon="user-times"/> },
        text: 'Un-Follow Artist',
      };
    case FollowingButtonAction.NOT_FOLLOWING:
      return initialFollowingButtonState;
    default:
      return state;
  }
};

export default followingButtonReducer;
