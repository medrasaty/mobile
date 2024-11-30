import { BaseUser } from "@/types/user.types";

export const ProfileQueryKeys = {
  all: ["profile"] as const,
  detail: (pk: BaseUser["pk"]) => [...ProfileQueryKeys.all, pk],
};
