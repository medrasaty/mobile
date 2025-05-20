import { BaseUser } from "@/types/user.types";

const BASE_KEY = ["profile"];

export const ProfileQueryKeys = {
  all: BASE_KEY,
  /**
   * Current Auth user profile query
   */
  profile: [...BASE_KEY, "current"],
  detail: (pk: BaseUser["pk"]) => [...BASE_KEY, pk],
};
