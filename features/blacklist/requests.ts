import { Axios } from "axios";
import { BlackListUser } from "./types";
import { BaseUser } from "@/types/user.types";

export async function unblockUser(client: Axios, pk: BlackListUser["pk"]) {
  return await client.delete(`/users/${pk}/unblock/`);
}

export async function blockUser(client: Axios, pk: BaseUser["pk"]) {
  return await client.post(`/users/${pk}/block/`);
}
