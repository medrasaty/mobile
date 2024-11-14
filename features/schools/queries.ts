import useAuthClient from "@/hooks/useAuthClient";
import { PaginatedResponse } from "@/types/requests";
import { useQuery } from "@tanstack/react-query";
import { School } from "./types";
import { SchoolQueryKeys } from "./keys";
import { BaseUser, UserType } from "@/types/user.types";
import { RefreshControl } from "react-native";

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

export function useSchoolMembers(schoolId: School["id"]) {
  const client = useAuthClient();
  return useQuery({
    queryKey: SchoolQueryKeys.members(schoolId),
    queryFn: async () => {
      const res = await client.get<PaginatedResponse<BaseUser>>(`/users/`, {
        params: {
          school: schoolId,
        },
      });
      return res.data.results;
    },
  });
}

export function useSchoolDetail(schoolId: School["id"]) {
  /**
   * Combine two queries and expose them as single one
   *
   */

  const schoolQuery = useSchool(schoolId);
  const membersQuery = useSchoolMembers(schoolId);

  const refetch = () => {
    schoolQuery.refetch();
    membersQuery.refetch();
  };

  return {
    isPending: schoolQuery.isPending || membersQuery.isPending,
    isError: schoolQuery.isPending || membersQuery.isPending,
    isSuccess: schoolQuery.isPending || membersQuery.isPending,
    isRefetching: schoolQuery.isRefetching || membersQuery.isRefetching,
    schoolData: schoolQuery.data,
    membersData: membersQuery.data,
    refetch: refetch,
    schoolQuery,
    membersQuery,
  };
}
