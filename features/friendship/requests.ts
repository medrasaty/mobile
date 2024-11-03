import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { FollowingRequest, FriendUser } from "./types";

export async function follow(client: Axios, username: BaseUser["username"]) {
  /**
   * Follow the user.
   */
  const response = await client.post(`/users/${username}/follow/`);
  return response;
}

export async function followBack(
  client: Axios,
  username: BaseUser["username"]
) {
  const response = await client.post(`/users/${username}/follow_back/`);
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

export async function getFriends(client: Axios): Promise<FriendUser[]> {
  /**
   * Get all friends of the current user.
   */
  const response = await client.get(`/friendship/friends/`);
  return response.data.results;
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

  const response = await client.get(`/friendship/followings/`);
  return response.data.results;
}


export async function getFollowingRequestFromUser(client: Axios): Promise<FollowingRequest[]> {
  const response = await client.get<{results: FollowingRequest[]}>('/following_requests/from_me/')
  return response.data.results

}