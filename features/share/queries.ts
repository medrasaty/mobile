import { useMemo } from "react";
import { useFollowingQuery } from "../friendship/queries";
import { useShareStore } from "./store";

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
