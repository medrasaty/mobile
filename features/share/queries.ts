import { useMemo } from "react";
import {
  FriendsQueryKeys,
  useFollowingQuery,
} from "../friendship/hooks/useFriendsQuery";
import { useShareStore } from "./store";
import { useQueryClient } from "@tanstack/react-query";

export default function useShareUsers(params: any = {}) {
  const q = useFollowingQuery(params);
  const selectedUsers = useShareStore((state) => state.selectedUsers);

  const unSelectedUsers = useMemo(() => {
    if (q.data) {
      // filter data from selected users
      return q.data.filter((user) => {
        // filter if user id is in sharedWithUsers ids
        for (const sharedUser of selectedUsers) {
          if (sharedUser.id === user.id) {
            return false;
          }
        }
        return true;
      });
    }

    return [];
  }, [q.data, selectedUsers]);

  return {
    ...q,
    unSelectedUsers,
  };
}
