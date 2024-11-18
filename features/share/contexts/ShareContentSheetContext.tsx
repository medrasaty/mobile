import React, { useContext, createContext, useState } from "react";
import { BaseUser } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { FriendUser } from "@/features/friendship/types";
import { FriendsQueryKeys } from "@/features/friendship/hooks/useFriendsQuery";
import { sharedWithKeys } from "../keys";
import { UsersQueryKeys } from "@/features/schools/keys";

export type ShareContentSheetContextProps = {
  selectedUsers: BaseUser["id"][];
  addShare: (id: BaseUser["id"]) => void;
  removeShare: (id: BaseUser["id"]) => void;
};

export const ShareContentContext =
  createContext<ShareContentSheetContextProps | null>(null);

export function ShareContentContextProvider({
  children,
}: React.PropsWithChildren) {
  const [selectedUsers, setSelectedUsers] = useState<BaseUser["id"][]>([]);

  const addShare = (id: BaseUser["id"]) => {
    setSelectedUsers([...selectedUsers, id]);
  };

  const removeShare = (id: BaseUser["id"]) => {
    setSelectedUsers((state) => state.filter((s) => s !== id));
  };

  return (
    <ShareContentContext.Provider
      value={{
        selectedUsers: selectedUsers,
        addShare,
        removeShare,
      }}
    >
      {children}
    </ShareContentContext.Provider>
  );
}

export function useShareContext() {
  const value = useContext(ShareContentContext);

  if (!value) {
    throw new Error(
      "useShareContext must be used within a SearchContextProvider"
    );
  }

  return value;
}
