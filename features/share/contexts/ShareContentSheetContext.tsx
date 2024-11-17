import React, { useContext, createContext, useState } from "react";
import { BaseUser } from "@/types/user.types";

export type ShareContentSheetContextProps = {
  sharedWith: BaseUser["id"][];
  addShare: (id: BaseUser["id"]) => void;
  removeShare: (id: BaseUser["id"]) => void;
};

export const ShareContentContext =
  createContext<ShareContentSheetContextProps | null>(null);

export function ShareContentContextProvider({
  children,
}: React.PropsWithChildren) {
  const [sharedWith, setSharedWith] = useState<BaseUser["id"][]>([]);

  const addShare = (id: BaseUser["id"]) => {
    setSharedWith([...sharedWith, id]);
  };
  const removeShare = (id: BaseUser["id"]) => {
    setSharedWith((state) => state.filter((s) => s !== id));
  };

  return (
    <ShareContentContext.Provider
      value={{
        sharedWith,
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
