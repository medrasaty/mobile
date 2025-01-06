import { PaginatedResponse } from "@/types/requests";
import { Axios } from "axios";
import { WatchHistory } from "./types";
import { CursorPaginatedResponse } from "@/types/responses";

export async function getHistory(client: Axios, params: any = {}) {
  const res = await client.get<PaginatedResponse<WatchHistory>>(
    "/activities/watch_history/",
    {
      params,
    }
  );

  return res.data.results.map((w) => ({
    ...w,
    watched_at: new Date(w.watched_at),
  }));
}

export async function getInfiniteHistory(
  client: Axios,
  url: string,
  params: any
): Promise<CursorPaginatedResponse<WatchHistory>> {
  const res = await client.get<CursorPaginatedResponse<WatchHistory>>(url, {
    params: params,
  });

  return {
    ...res.data,
    results: res.data.results.map((w) => ({
      ...w,
      watched_at: new Date(w.watched_at),
    })),
  };
}

export async function deleteWatchHistory(
  client: Axios,
  historyId: WatchHistory["id"]
) {
  return await client.delete(`/activities/watch_history/${historyId}/`);
}
