import { BaseSchool } from "@/types/school.types";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  name: string;
  father_name: string;
  grand_father_name: string;
  family_name: string;
  full_name: string;
  short_name: string;
  type: string;
  school: BaseSchool;
  school_name: string;
  date_joined: Date;
  gender: string;
  reputation_points: number;
  profile_picture: string;
  is_superuser: boolean;
  followings_count: number;
  followers_count: number;
  reach: number;
  background_picture: string;
  total_views: number;
  is_self: boolean;
  is_following: boolean;
  is_follower: boolean;
  profile: BaseProfile;
  following_request_status: RequestStatus | null;
}

type RequestStatus = "accepted" | "rejected" | "pending";

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
