import { BaseUser } from "./user.types";

export interface Question {
  id: string;
  owner: BaseUser;
  tags: string[];
  subject: string;
  title: string;
  text: string;
  picture: null;
  ratings: number[];
  answers: string[];
  created: Date;
  modified: Date;
}
