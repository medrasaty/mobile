import React, { useContext, createContext } from "react";
import { Snackbar } from "react-native-paper";
import { UseQueryResult } from "@tanstack/react-query";

export type ProfileScreenContextType = {
  profileQuery: UseQueryResult;
};

export const ProfileScreenContext = createContext<ProfileScreenContextType>({});

export function ProfileScreenProvider({
  children,
  value,
}: React.PropsWithChildren & { value: ProfileScreenContextType }) {
  return (
    <ProfileScreenContext.Provider value={value}>
      {children}
    </ProfileScreenContext.Provider>
  );
}

export function useProfileScreen(): ProfileScreenContextType {
  const value = useContext(ProfileScreenContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useProfileScreen must be used within a <ProfileScreenProvider>"
      );
    }
  }

  return value;
}
