import { BaseSchool } from "@/types/school.types";
import { BaseUser } from "@/types/user.types";

export interface UserProfile extends BaseUser {
  followings_count: number;
  followers_count: number;
  background_picture: string;
  is_self: boolean;
  is_following: boolean;
  is_follower: boolean;
}

type NavigatorButtonType = {
  index: number;
  label: string;
  value: ProfileListChoices;
};
