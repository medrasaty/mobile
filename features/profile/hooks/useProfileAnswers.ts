import { BaseUser } from "@/types/user.types";
import { useForumAnswers } from "@forum/answers/queries";

export default function useProfileAnswers(
  userId: BaseUser["id"],
  params: any = {}
) {
  return useForumAnswers({
    ...params,
    owner: userId,
  });
}
