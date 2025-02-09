import { Question } from "@/types/forum.types";

export interface BookmarkQuestion {
  bookmarked_at: Date;
  question: Question;
}
