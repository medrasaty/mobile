import { BaseSchool } from "@/types/school.types";
import { BaseUser } from "@/types/user.types";

export type UserProfile = BaseUser & {
  school: BaseSchool;
  school_name: string;
  date_joined: Date;
  reputation: number;
  followings_count: number;
  followers_count: number;
  reach: number;
  background_picture: string;
  total_views: number;
  is_self: boolean;
  is_following: boolean;
  is_follower: boolean;
  profile: BaseProfile;
  following_request_status: FollowingRequestStatusType | null;
  is_blocker: boolean;
  is_blocked: boolean;
};

export enum FollowingRequestStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PENDING = "pending",
}

export type FollowingRequestStatusType = "accepted" | "rejected" | "pending";

export interface BaseProfile {
  user: string;
  is_private: boolean;
  background: string;
}

export enum ProfileListChoices {
  QUESTIONS = "questions",
  ANSWERS = "answers",
}

export type NavigatorButtonTypeValues =
  | ProfileListChoices.QUESTIONS
  | ProfileListChoices.ANSWERS;

export type NavigatorButtonType = {
  index: number;
  label: string;
  value: NavigatorButtonTypeValues;
};

export type SortingOption<T> = {
  label: string;
  key: T;
};

export type TypedData<T> = {
  type: T;
  payload: any;
};

const enum ProfileListTypedDataChoices {
  ANSWER = "ANSWER",
  QUESTION = "QUESTION",
  NAVIGATOR = "NAVIGATOR",
  FILTER = "FILTER",
  EMPTY = "EMPTY",
}
