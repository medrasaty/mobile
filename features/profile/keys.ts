import { BaseUser } from "@/types/user.types";

export const ProfileQueryKeys = {
  all: ["profile"] as const,
  withUsername: (username: BaseUser["username"]) => [
    ...ProfileQueryKeys.all,
    username,
  ],
};
