import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { UserProfile, BaseProfile, UpdateProfileData } from "./types";
import { Answer, Question } from "@/types/forum.types";
import { transformDates } from "../forum/utils";
import { SortingOption } from "./types.types";
import { questionOrderKeys } from "./hooks/useProfileQuestions";
import { AuthUser } from "@/features/auth/types";
import { request } from "@/lib/api";
import Toast from "@/lib/toast";
import { t } from "i18next";

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
 * @param userPk User primary key
 * @param data Partial data to update
 * @returns Updated user profile
 */
export async function updatePartialUserProfile(
  data: Partial<UpdateProfileData>
): Promise<UserProfile> {
  const response = await request<UserProfile>({
    url: `/users/profile/`,
    method: "PATCH",
    data,
    onError: (error) => {
      Toast.error(t("profile.update_error", "Failed to update profile"));
    },
  });
  return response.data;
}
