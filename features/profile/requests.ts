import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { UserProfile } from "./types";

export async function getProfile(
  client: Axios,
  username: BaseUser["username"]
) {
  const response = await client.get(`/users/${username}/`);
  return transformProfile(response.data);
}

function transformProfile(profile: UserProfile) {
  return {
    ...profile,
    date_joined: new Date(profile.date_joined),
  };
}
