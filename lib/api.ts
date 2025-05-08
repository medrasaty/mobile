import axios, { Axios, AxiosRequestConfig } from "axios";
import { API_URL } from "@/constants";
import { useAuthSession } from "@features/auth/store";

export function AuthClient(): Axios {
  // Get token from store
  const token = useAuthSession.getState().session?.token;

  const config = {
    baseURL: API_URL,
    headers: {
      Authorization: `TOKEN ${token}`,
    },
  } satisfies AxiosRequestConfig;

  return axios.create(config);
}

/**
 * A unified function to perform all authenticated requests
 * @param config AxiosRequestConfig
 * @returns
 */
export async function request<T>(config: AxiosRequestConfig) {
  const client = AuthClient();
  return await client.request<T>(config);
}
