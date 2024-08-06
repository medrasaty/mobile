import { Subject } from "./school.types";
import { BaseUser } from "./user.types";

export interface Question {
  id: string;
  owner: BaseUser;
  tags: string[];
  subject: Subject;
  title: string;
  text: string;
  picture: null;
  ratings: number[];
  ratings_value: number;
  views: number;
  answers_count: number;
  answers: string[];
  created: Date;
  modified: Date;
}

export interface DetailQuestion extends Question {
  user_rating: Rating | null;
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
}

export interface Answer {
  id: string;
  owner: BaseUser;
  question: string;
  text: string;
  picture: null | string;
  ratings: number[];
  replies: string[];
  created: Date;
  modified: Date;
}
