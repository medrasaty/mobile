import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseUser } from "@/types/user.types";
import { BaseProfile, UpdateBaseProfileData, UpdateUserData } from "./types";
import { ProfileQueryKeys } from "./keys";
import { updatePartialUserProfile, updateProfile } from "./requests";
import Toast from "@/lib/toast";
import { t } from "i18next";
import { useAuthSession } from "@features/auth/store";

/**
 * Mutation hook for updating the current user profile with partial data
 *
 * This hook allows updating any field of the user profile. It accepts partial data
 * and only updates the specified fields.
 *
 * @example
 * const updateUserProfile = useUpdateUserProfileMutation(userId);
 * // Update only the display_name
 * updateUserProfile.mutate({ display_name: "New Name" });
 *
 * @param userId - The ID of the user to update
 * @returns A mutation hook for updating the user profile
 */
export function useUpdateUserProfileMutation(userId: BaseUser["pk"]) {
  const qc = useQueryClient();
  const updateSession = useAuthSession((state) => state.updateUser);

  return useMutation({
    mutationKey: [...ProfileQueryKeys.all, "update", userId],
    mutationFn: async (data: Partial<UpdateUserData>) =>
      await updatePartialUserProfile(data),

    onMutate: async (newData) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await qc.cancelQueries({
        queryKey: ProfileQueryKeys.detail(userId),
      });

      // Snapshot the previous value
      const previousProfile = qc.getQueryData<UpdateUserData>(
        ProfileQueryKeys.detail(userId)
      );

      // Optimistically update the profile
      if (previousProfile) {
        qc.setQueryData(ProfileQueryKeys.detail(userId), {
          ...previousProfile,
          ...newData,
        });
      }

      return { previousProfile };
    },

    onSuccess: (updatedProfile) => {
      // Update the cache with the returned data
      qc.setQueryData(ProfileQueryKeys.detail(userId), updatedProfile);

      // Update the local session with the new profile data
      updateSession(updatedProfile);

      // Show success message
      Toast.success(
        t("profile.update_success", "Profile updated successfully")
      );
    },

    onError: (_error, _variables, context) => {
      // Revert to the previous profile on error
      if (context?.previousProfile) {
        qc.setQueryData(
          ProfileQueryKeys.detail(userId),
          context.previousProfile
        );
      }

      // Show error message
      Toast.error(t("profile.update_error", "Failed to update profile"));
    },

    onSettled: () => {
      // Invalidate the profile query to ensure fresh data
      qc.invalidateQueries({
        queryKey: ProfileQueryKeys.detail(userId),
      });
    },
  });
}

export function useUpdateProfileMutation(userId: BaseProfile["user"]) {
  const qc = useQueryClient();
  const updateUser = useAuthSession((state) => state.updateUser);

  return useMutation({
    mutationKey: [...ProfileQueryKeys.profile, "update_profile"],
    mutationFn: async (data: Partial<UpdateBaseProfileData>) =>
      await updateProfile(data, userId),

    onSuccess: (updatedProfile) => {
      // Update the cache with the returned data
      qc.setQueryData(ProfileQueryKeys.profile, updatedProfile);

      // Update the local session with the new profile data
      updateUser({
        profile: updatedProfile,
      });

      // Show success message
      Toast.success(
        t("profile.update_success", "Profile updated successfully")
      );
    },

    onError: (_error, _variables, _context) => {
      // Show error message
      Toast.error(t("profile.update_error", "Failed to update profile"));
    },

    onSettled: () => {
      // Invalidate the profile query to ensure fresh data
      qc.invalidateQueries({
        queryKey: ProfileQueryKeys.detail(userId),
      });
    },
  });
}
