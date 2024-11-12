import { BaseUser } from "@/types/user.types";

export interface Result {
  id: string;
  title: string;
  owner: BaseUser;
  subject: string;
  text: string;
  picture: null | string;
  ratings_value: number;
  answers: string[];
  created: Date;
  modified: Date;
  views: number;
  answers_count: number;
  tags: string[];
}
