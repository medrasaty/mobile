import { BaseUser } from "@/types/user.types";
import { Axios } from "axios";
import { FollowingRequest, FriendUser } from "./types";
import { PaginatedResponse } from "@/types/requests";
import { transformDates } from "../forum/utils";
import { resolvePlugin } from "@babel/core";
import { CursorPaginatedResponse } from "@/types/responses";

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

export async function getFollowings(client: Axios, params: any = {}) {
  /**
   * Get all followers of the current user.
   */

  const response = await client.get<PaginatedResponse<FriendUser>>(
    `/friendship/followings/`,
    { params }
  );
  return response.data.results;
}

export async function getFollowingRequestsFromUser(
  client: Axios,
  params?: any
): Promise<FollowingRequest[]> {
  const response = await client.get<PaginatedResponse<FollowingRequest>>(
    "/following_requests/from_me/",
    { params }
  );
  return response.data.results.map(transformDates);
}

export async function deleteFollowingRequest(
  client: Axios,
  requestId: FollowingRequest["id"]
) {
  return await client.delete(`/following_requests/${requestId}/`);
}

export async function getFollowingRequestsToMe(client: Axios, params: any) {
  const response = await client.get<PaginatedResponse<FollowingRequest>>(
    `/following_requests/to_me/`,
    { params }
  );
  const value = {
    ...response.data,
    results: response.data.results.map(transformDates),
  };
  return value;
}

export async function getInfiniteFollowingRequestsToMe(
  client: Axios,
  queryParams: any,
  pageParam: string // URL with required paginated.
) {
  const res = await client.get<CursorPaginatedResponse<FollowingRequest>>(
    pageParam,
    { params: queryParams }
  );
  // return full data, not just results
  return {
    ...res.data,
    results: res.data.results.map(transformDates),
  };
}

export async function acceptFollowingRequest(
  client: Axios,
  requestId: FollowingRequest["id"]
) {
  return await client.patch(`/following_requests/${requestId}/accept/`);
}

export async function rejectFollowingRequest(
  client: Axios,
  requestId: FollowingRequest["id"]
) {
  return await client.patch(`/following_requests/${requestId}/reject/`);
}
