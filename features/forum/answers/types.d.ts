import { BaseQuestion, RatingValue } from "@/types/forum.types";
import { BaseUser } from "@/types/user.types";

export interface BaseAnswer {
  created: string;
  id: string;
  modified: string;
  picture: string | null;
  question: string;
  text: string;
}

export interface Answer {
  id: sring;
  owner: BaseUser;
  text: string;
  picture: string | null;
  ratings_value: number;
  created: Date;
  modified: Date;
  question: BaseQuestion;
  replies: string[]; // list of replies ids
  replies_count: number;
  user_rating: RatingValue;
}
