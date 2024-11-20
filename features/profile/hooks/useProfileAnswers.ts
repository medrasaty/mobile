import useAuthClient from "@/hooks/useAuthClient";
import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { getUserAnswers } from "../requests";
import { useForumAnswers } from "@forum/answers/queries";

export default function useProfileAnswers(
  username: BaseUser["username"],
  params: any = {}
) {
  return useForumAnswers({
    ...params,
    owner: username,
  });
}
