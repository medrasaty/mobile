import { useForumQuestions } from "../forum/queries";
import { BaseUser } from "@/types/user.types";

export default function useUserQuestions(
  userId: BaseUser["id"] | undefined,
  params: any = {}
) {
  return useForumQuestions({
    ...params,
    owner: userId,
  });
}
