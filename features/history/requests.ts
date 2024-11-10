import { PaginatedResponse } from "@/types/requests";
import { Axios } from "axios";
import { WatchHistory } from "./types";

export async function getHistory(client: Axios, params: any = {}) {
  const res = await client.get<PaginatedResponse<WatchHistory>>(
    "/activities/watch_history/",
    { params }
  );
  return res.data.results.map((w) => ({
    ...w,
    watched_at: new Date(w.watched_at),
  }));
}
