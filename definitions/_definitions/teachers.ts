import { Grade } from ".";
import { BaseUser } from "./session";

export interface Teacher extends BaseUser {
  teachermore: TeacherMore;
}

export interface TeacherMore {
  user: number;
  subjects: string[];
  grades: Grade["id"][];
  sections: string[];
  bio: string;
  profile_picture: null;
}
