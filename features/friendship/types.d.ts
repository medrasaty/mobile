import { BaseUser } from "@/types/user.types";

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
