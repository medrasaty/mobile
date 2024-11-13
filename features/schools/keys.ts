import { School } from "./types";

export const SchoolQueryKeys = {
  all: ["schools"] as const,
  detail: (schoolId: School["id"]) => [...SchoolQueryKeys.all, schoolId],
};
