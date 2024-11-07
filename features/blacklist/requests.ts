import { Axios } from "axios";
import { BlackListUser } from "./types";

export async function unblockUser(
  client: Axios,
  username: BlackListUser["username"]
) {
  return await client.delete(`/users/${username}/unblock/`);
}
