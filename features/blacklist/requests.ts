import { Axios } from "axios";
import { BlackListUser } from "./types";
import { BaseUser } from "@/types/user.types";
import { request } from "@/lib/api";
import Toast from "@/lib/toast";
import { t } from "i18next";

export async function unblockUser(client: Axios, pk: BlackListUser["pk"]) {
  return await client.delete(`/users/${pk}/unblock/`);
}

export async function blockUser(client: Axios, pk: BaseUser["pk"]) {
  return await client.post(`/users/${pk}/block/`);
}

/**
 * Unblock all users in the blacklist at once
 */
export async function unblockAllUsers() {
  return await request({
    url: '/blacklist/clear_blacklist/',
    method: "DELETE",
    onError: (error) => {
      Toast.error(t("blacklist.failed_clearing_blacklist"))
    }
  });
}
