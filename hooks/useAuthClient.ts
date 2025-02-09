import axios, { Axios, AxiosRequestConfig } from "axios";
import useToken from "./useToken";
import { API_URL } from "@/constants";
import { useAuthSession } from "@features/auth/store";

export default function useAuthClient(): Axios {
  const token = useToken();

  const config = {
    baseURL: API_URL,
    headers: {
      Authorization: `TOKEN ${token}`,
    },
  } satisfies AxiosRequestConfig;

  return axios.create(config);
}

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
