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

export async function sendFollowingRequest(
  client: Axios,
  username: BaseUser["username"]
) {
  /**
   * Send following request to user
   */

  const data = {
    to_user: username,
  };

  const response = await client.post("/following_requests/", data);
  return response;
}

export async function getAllFollowers(client: Axios) {
  /**
   * Get all followers of the current user.
   */

  const response = await client.get(`/friendship/followers/`);
  return response.data.results;
}

export async function getAllFollowing(client: Axios) {
  /**
   * Get all followers of the current user.
   */

  const response = await client.get(`/friendship/following/`);
  return response.data.results;
}
