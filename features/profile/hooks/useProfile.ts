import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../requests";
import { ProfileQueryKeys } from "../keys";

export default function useProfile(pk: BaseUser["pk"]) {
  /**
   * Return the user profile
   */
  return useQuery({
    queryKey: ProfileQueryKeys.detail(pk),
    queryFn: async () => await getProfile(pk),
  });
}
