import { School } from "./types";

export const SchoolQueryKeys = {
  all: ["schools"] as const,
  detail: (schoolId: School["id"]) => [...SchoolQueryKeys.all, schoolId],
  members: (schoolId: School["id"]) => [
    ...SchoolQueryKeys.detail(schoolId),
    "members",
  ],
};

export const UsersQueryKeys = {
  all: ["users"] as const,
  withParams: (params: any) => [...UsersQueryKeys.all, params],
};
