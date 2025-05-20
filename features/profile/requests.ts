import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import {
  UserProfile,
  BaseProfile,
  UpdateUserData,
  UpdateBaseProfileData,
} from "./types";
import { Question } from "@/types/forum.types";
import { AuthUser } from "@/features/auth/types";
import { request } from "@/lib/api";
import Toast from "@/lib/toast";
import { t } from "i18next";
import { genFileUploadFromPath } from "@/lib/utils";

/**
 * Profile API Requests
 *
 * This module handles all API requests related to user profiles.
 *
 * IMPORTANT NOTE ABOUT IMAGE UPLOADS:
 * When updating profile data that includes images (like profile_picture or profile.background),
 * we need to use FormData instead of JSON. The parseUserProfileFormData function handles
 * the conversion of a nested JSON structure to FormData with proper field names.
 *
 * To update nested image fields:
 * 1. Pass the image path in the appropriate nested structure:
 *    Example: { profile: { background: "file:///path/to/image.jpg" } }
 *
 * 2. The function will convert this to FormData with dot notation:
 *    "profile.background" -> image file
 *
 * 3. Special cases:
 *    - profile_picture is sent as "avatar" to the server
 *    - All image paths must be valid file:// URIs
 *
 * See parseUserProfileFormData documentation for examples.
 */

export async function getProfile(
  client: Axios,
  pk: BaseUser["pk"]
): Promise<UserProfile> {
  const response = await client.get<UserProfile>(`/users/${pk}/`);
  return response.data;
}

export async function getUserQuestions(
  client: Axios,
  userId: BaseUser["id"]
): Promise<Question[]> {
  const response = await client.get("/forum/questions/", {
    params: {
      owner: userId,
      extend: "subject",
    },
  });

  return response.data.results.map(transformDates);
}

export async function getUserAnswers(
  client: Axios,
  userId: BaseUser["id"]
): Promise<Answer[]> {
  const response = await client.get("/forum/answers/", {
    params: {
      owner: userId,
    },
  });

  return response.data.results.map(transformDates);
}

export interface UserUpdateData {
  display_name: string;
  email: string;
}

export async function updateUserInfo(
  client: Axios,
  userId: BaseUser["id"],
  data: UserUpdateData
): Promise<AuthUser> {
  const response = await client.patch<AuthUser>(`/users/${userId}/`, data);
  return response.data;
}

export interface ProfileUpdateData {
  biography: string;
  is_private: boolean;
}

export async function updateUserProfile(
  client: Axios,
  userPk: string,
  data: ProfileUpdateData
): Promise<BaseProfile> {
  const response = await client.patch<BaseProfile>(
    `/users/${userPk}/profile/`,
    data
  );
  return response.data;
}

export interface ProfileImageUpdateData {
  image: FormData;
}

export async function updateProfilePicture(
  client: Axios,
  userId: BaseUser["id"],
  data: ProfileImageUpdateData
): Promise<{ profile_picture: string }> {
  const response = await client.patch<{ profile_picture: string }>(
    `/users/${userId}/profile_picture/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function updateProfileBackground(
  client: Axios,
  userPk: string,
  data: ProfileImageUpdateData
): Promise<{ background: string }> {
  const response = await client.patch<{ background: string }>(
    `/users/${userPk}/profile/background/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
/**
 * Update user profile with partial data
 * This function allows updating any field of the user profile
 * @param data Partial data to update
 * @returns Updated user profile
 */
export async function updateProfile(
  data: Partial<UpdateBaseProfileData>,
  userPk: BaseProfile["user"]
): Promise<BaseProfile> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // @ts-ignore
    formData.append(key, genFormValue(value));
  });

  const response = await request<BaseProfile>({
    url: `/profile/${userPk}/`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // This is required because Axios in React Native has issues with FormData
    // Without this, the FormData object might not be properly converted to multipart/form-data
    transformRequest: (_data, _headers) => {
      return formData;
    },
    onError: (error) => {
      console.error("Profile.update error:", error);
      Toast.error(t("profile.update_error", "Failed to update profile"));
    },
  });

  return response.data;
}

/**
 * Update user profile with partial data
 * This function allows updating any field of the user profile
 * @param data Partial data to update
 * @returns Updated user profile
 */
export async function updatePartialUserProfile(
  data: Partial<UpdateUserData>
): Promise<UserProfile> {
  const formData = parseUserProfileFormData(data);

  const response = await request<UserProfile>({
    url: `/users/profile/`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // This is required because Axios in React Native has issues with FormData
    // Without this, the FormData object might not be properly converted to multipart/form-data
    transformRequest: (_data, _headers) => {
      return formData;
    },
    onError: (error) => {
      console.error("Profile.update error:", error);
      Toast.error(t("profile.update_error", "Failed to update profile"));
    },
  });
  return response.data;
}

/**
 * Parse user profile data into FormData
 * Handles both direct fields and nested fields with consistent approach for all fields
 *
 * @param data Partial update data containing fields to update
 * @returns FormData object ready to be sent to the server
 */
export function parseUserProfileFormData(data: Partial<UpdateUserData>) {
  const formData = new FormData();
  // Process all fields
  Object.entries(data).forEach(([key, value]) => {
    // Special case: profile_picture is sent as "avatar" to the server
    if (key === "profile_picture") {
      formData.append("avatar", genFormValue(value));
    }
    // Handle regular fields
    else {
      formData.append(key, genFormValue(value));
    }
  });

  return formData;
}

function genFormValue(value: any) {
  // Skip undefined or null values
  if (value === undefined || value === null) return;

  // Handle file upload objects (profile_picture, profile.background, etc.)
  if (typeof value === "object" && "uri" in value) {
    // @ts-ignore - React Native's FormData implementation accepts fileUploadType
    return value;
  }
  // Handle string paths that need to be converted to file upload objects
  else if (typeof value === "string" && value.startsWith("file://")) {
    const fileUpload = genFileUploadFromPath(value);
    // @ts-ignore - React Native's FormData implementation accepts fileUploadType
    return fileUpload;
  }
  // Handle regular values
  else {
    return value.toString();
  }
}
