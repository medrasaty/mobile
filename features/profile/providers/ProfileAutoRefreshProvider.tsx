import React from "react";
import useProfileAutoRefresh from "../hooks/useProfileAutoRefresh";

const ProfileAutoRefreshProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Initialize the profile auto-refresh hook
  useProfileAutoRefresh();

  return <>{children}</>;
};

export default ProfileAutoRefreshProvider;

