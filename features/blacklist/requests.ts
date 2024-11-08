import { Axios } from "axios";
import { BlackListUser } from "./types";
import { BaseUser } from "@/types/user.types";

export async function unblockUser(
  client: Axios,
  username: BlackListUser["username"]
) {
  return await client.delete(`/users/${username}/unblock/`);
}

export async function blockUser(client: Axios, username: BaseUser["username"]) {
  return await client.post(`/users/${username}/block/`);
}
