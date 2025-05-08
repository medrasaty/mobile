import { Question } from "@/types/forum.types";

export type BookmarkQuestion = {
  bookmarked_at: Date;
  question: Question;
};
