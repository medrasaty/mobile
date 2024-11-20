import React, { useContext, createContext } from "react";
import { UserProfile } from "@/features/profile/types";

export type ProfileScreenContextType = {
  profile: UserProfile;
};

export const ProfileScreenContext =
  createContext<ProfileScreenContextType | null>(null);

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

export function useProfileScreen() {
  const value = useContext(ProfileScreenContext);

  if (!value) {
    throw new Error(
      "useProfileScreen must be used within a ProfileScreenProvider"
    );
  }

  return value;
}
