import useAuthClient from "@/hooks/useAuthClient";
import { PaginatedResponse } from "@/types/requests";
import { useQuery } from "@tanstack/react-query";
import { School } from "./types";
import { SchoolQueryKeys } from "./keys";

export function useSchools() {
  const client = useAuthClient();

  return useQuery({
    queryKey: SchoolQueryKeys.all,
    queryFn: async () => {
      const res = await client.get<PaginatedResponse<School>>(`/schools/`);
      return res.data.results;
    },
  });
}

/**
 * Return detail information about specefic school
 */

export function useSchool(schoolId: School["id"]) {
  const client = useAuthClient();

  return useQuery({
    queryKey: SchoolQueryKeys.detail(schoolId),
    queryFn: async () => {
      const res = await client.get(`/schools/${schoolId}/`);
      return res.data;
    },
  });
}
