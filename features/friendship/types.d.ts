import { BaseUser } from "@/types/user.types";
import { FlashListProps } from "@shopify/flash-list";

interface FriendUser extends BaseUser {
  is_following: boolean;
  is_follower: boolean;
}

export interface FollowingRequest {
  id: string;
  from_user: BaseUser;
  to_user: BaseUser;
  status: FollowingRequestStatusType;
  created: Date;
  modified: Date;
}

export type FollowingRequestsListType = Omit<
  Omit<FlashListProps<FollowingRequest>, "renderItem">,
  "estimatedItemSize"
>;
