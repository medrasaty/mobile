import React from "react";
import useProfileAutoRefresh from "../hooks/useProfileAutoRefresh";

type ProfileAutoRefreshProviderProps = {
  children: React.ReactNode;
};

/**
 * Provider that automatically refreshes user profile data:
 * - When the app launches
 * - When network connectivity is restored
 * - When the app comes back from background
 */
const ProfileAutoRefreshProvider: React.FC<ProfileAutoRefreshProviderProps> = ({
  children,
}) => {
  // Use the profile auto-refresh hook
  useProfileAutoRefresh();

  // Simply render children, the hook handles all the logic
  return <>{children}</>;
};

export default ProfileAutoRefreshProvider; 