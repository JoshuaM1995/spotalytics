export enum FollowingButtonActions {
  FOLLOWING = 'FOLLOWING',
  FOLLOWING_HOVER = 'FOLLOWING_HOVER',
  NOT_FOLLOWING = 'NOT_FOLLOWING',
}

export type FollowingButtonAction =
  | { type: FollowingButtonActions.FOLLOWING }
  | { type: FollowingButtonActions.FOLLOWING_HOVER }
  | { type: FollowingButtonActions.NOT_FOLLOWING };
