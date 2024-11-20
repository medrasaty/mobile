import { BaseQuestion, RatingValue } from "@/types/forum.types";
import { BaseUser } from "@/types/user.types";

export interface Answer {
  id: string;
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
