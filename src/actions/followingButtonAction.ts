export enum FollowingButtonAction {
  FOLLOWING = 'FOLLOWING',
  FOLLOWING_HOVER = 'FOLLOWING_HOVER',
  NOT_FOLLOWING = 'NOT_FOLLOWING',
}

export type FollowingButtonActions =
  | { type: FollowingButtonAction.FOLLOWING }
  | { type: FollowingButtonAction.FOLLOWING_HOVER }
  | { type: FollowingButtonAction.NOT_FOLLOWING };
