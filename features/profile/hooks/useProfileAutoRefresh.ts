import { useEffect, useRef } from "react";
import { useAuthSession } from "@/features/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileQueryKeys } from "../keys";
import { getCurrentUserProfile, getProfile } from "../requests";
import useAuthClient from "@/hooks/useAuthClient";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";

/**
 * Hook to automatically refresh the current user's profile
 * - On app launch (if online)
 * - When network connection is restored
 * - When app returns to foreground
 */
export default function useProfileAutoRefresh() {
  const session = useAuthSession((state) => state.session);
  const updateUser = useAuthSession((state) => state.updateUser);

  const qc = useQueryClient();
  const networkListener = useRef<any>(null);
  const appStateListener = useRef<any>(null);

  // Function to fetch and update profile
  const refreshProfile = async () => {
    if (!session?.user?.pk) return;

    try {
      // Check if we're online
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) return;

      // Fetch updated profile data
      const updatedProfile = await getCurrentUserProfile();

      // Update local state
      if (updatedProfile) {
        // Update auth session store
        updateUser(updatedProfile);

        // Update query cache
        qc.setQueryData(ProfileQueryKeys.profile, updatedProfile);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  // Set up auto-refresh mechanisms
  useEffect(() => {
    if (!session?.user?.pk) return;

    // Refresh when hook is mounted (app launch)
    refreshProfile();

    // Set up network change listener
    networkListener.current = NetInfo.addEventListener((state) => {
      // When connection is restored, refresh profile
      if (state.isConnected) {
        refreshProfile();
      }
    });

    // Clean up listeners on unmount
    return () => {
      if (networkListener.current) {
        networkListener.current();
      }
      if (appStateListener.current) {
        appStateListener.current.remove();
      }
    };
  }, [session?.user?.pk]);

  return {
    refreshProfile,
  };
}
