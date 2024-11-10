import { BaseUser } from "@/types/user.types";
import { BaseQuestion } from "@/types/forum.types";

interface HistoryQuestion extends BaseQuestion {
  owner: BaseUser;
}

export interface WatchHistory {
  id: string;
  question: HistoryQuestion;
  watched_at: Date;
}
