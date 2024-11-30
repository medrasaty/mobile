import { BaseUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../requests";
import useAuthClient from "@/hooks/useAuthClient";
import { ProfileQueryKeys } from "../keys";

export default function useProfile(pk: BaseUser["pk"]) {
  /**
   * Return the user profile
   */

  const client = useAuthClient();

  return useQuery({
    queryKey: ProfileQueryKeys.detail(pk),
    queryFn: async () => await getProfile(client, pk),
  });
}
