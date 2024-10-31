import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";

export async function follow(client: Axios, username: BaseUser["username"]) {
  /**
   * Follow the user.
   */
  const response = await client.post(`/users/${username}/follow/`);
  return response;
}

export async function unfollow(client: Axios, username: BaseUser["username"]) {
  /**
   * Follow the user.
   */
  const response = await client.delete(`/users/${username}/unfollow/`);
  return response;
}
