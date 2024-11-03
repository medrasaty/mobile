import { BaseUser } from "@/types/user.types";

interface FriendUser extends BaseUser {
  is_following: boolean;
  is_follower: boolean;
}
