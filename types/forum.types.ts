import overlay from "react-native-paper/src/styles/overlay";
import { Subject } from "./school.types";
import { BaseUser, Student, Teacher } from "./user.types";

export interface BasicAnswer {
  id: string;
  owner: string;
  question: string;
  text: string;
  picture: null;
  created: Date;
  modified: Date;
}

interface BaseQuestionAnswer {
  owner: BaseUser;
  text: string;
  picture: string | null;
  ratings_value: number;
  created: Date;
  modified: Date;
}

/**
 * Question without nested fields.
 */
export interface BaseQuestion {
  id: string;
  title: string;
  owner: string;
  subject: string;
  text: string;
  picture: null | string;
  created: Date;
  modified: Date;
}

/**
 * Main Question type that should be used across the application.
 */
export interface Question extends BaseQuestionAnswer {
  id: string;
  tags: string[];
  subject: Subject;
  title: string;
  answers_count: number;
  answers: string[];
  views: number;
}

export interface DetailQuestion extends Question {
  user_rating: RatingValue;
  is_bookmarked: boolean;
  is_registered: boolean;
}

export interface Rating {
  id: string;
  owner: string;
  value: RatingValue;
  question: string;
}

export enum RatingValue {
  POSITIVE = 1,
  NEGATIVE = -1,
  NEURAL = 0,
}

export interface Answer extends BaseQuestionAnswer {
  id: string;
  question: string;
  replies: string[]; // list of replies ids
  replies_count: number;
  user_rating: RatingValue;
}

export interface Reply {
  id: string;
  owner: BaseUser;
  answer: BasicAnswer;
  text: string;
  created: Date;
  modified: Date;
}
