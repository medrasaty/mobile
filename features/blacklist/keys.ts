/**
 * Store query keys as well as mutation keys.
 */

import { BaseUser } from "@/types/user.types";

export const BlackListKeys = {
  all: ["blacklist"] as const,
  mutate_blacklist: ["mutate_blacklist"] as const,
  block: (username: BaseUser["username"]) => [
    ...BlackListKeys.mutate_blacklist,
    "block",
    username,
  ],
  unblock: (username: BaseUser["username"]) => [
    ...BlackListKeys.mutate_blacklist,
    "unblock",
    username,
  ],
};
