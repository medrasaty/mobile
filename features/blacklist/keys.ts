/**
 * Store query keys as well as mutation keys.
 */

import { BaseUser } from "@/types/user.types";

export const BlackListKeys = {
  all: ["blacklist"] as const,
  withParams: (params: any) => [...BlackListKeys.all, params],
  mutate_blacklist: ["mutate_blacklist"] as const,
  block: (pk: BaseUser["pk"]) => [
    ...BlackListKeys.mutate_blacklist,
    "block",
    pk,
  ],
  unblock: (pk: BaseUser["pk"]) => [
    ...BlackListKeys.mutate_blacklist,
    "unblock",
    pk,
  ],
  unblockAll: () => [
    ...BlackListKeys.mutate_blacklist,
    "unblock_all",
  ],
};
