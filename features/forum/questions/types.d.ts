import overlay from "react-native-paper/src/styles/overlay";
import { Subject } from "./school.types";
import { BaseUser, Student, Teacher } from "./user.types";
import { RatingValue } from "@/types/forum.types";

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
  contenttype: number;
  picture_height: number | null;
  picture_width: number | null;
}

export interface DetailQuestion extends Question {
  user_rating: RatingValue;
  is_bookmarked: boolean;
  is_registered: boolean;
}
