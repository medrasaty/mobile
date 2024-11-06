import useAuthClient from "@/hooks/useAuthClient";
import { useQuery } from "@tanstack/react-query";
import { getFollowingRequestsFromUser } from "../requests";
import { FilterOption } from "@/components/FilterOptionsView";

export const YOUR_FOLLOWING_REQUESTS_QUERY_KEY = "your_following_requests";

type useYourFollowingRequestQueryProps = {
  params: any;
};

export default function useYourFollowingRequestQuery({
  params,
}: useYourFollowingRequestQueryProps) {
  const client = useAuthClient();
  return useQuery({
    queryKey: [YOUR_FOLLOWING_REQUESTS_QUERY_KEY, params],
    queryFn: async () => await getFollowingRequestsFromUser(client, params),
  });
}
