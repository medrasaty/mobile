import { BaseSchool } from "@/types/school.types";
import { BaseUser } from "@/types/user.types";
import { BaseProfile } from "./types.types";

export interface UserProfile extends BaseUser {
  followings_count: number;
  followers_count: number;
  background_picture: string;
  profile: BaseProfile;
  is_blocker: boolean;
  is_blocked: boolean;
  is_self: boolean;
  is_following: boolean;
  is_follower: boolean;
  following_request_status: FollowingRequestStatusType;
}

export interface BaseProfile {
  user: string;
  is_private: boolean;
  background: string;
  biography: string;
}

type NavigatorButtonType = {
  index: number;
  label: string;
  value: ProfileListChoices;
};

export enum FollowingRequestStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PENDING = "pending",
}

export type FollowingRequestStatusType = "accepted" | "rejected" | "pending";
