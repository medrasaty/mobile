import axios, { Axios, AxiosRequestConfig } from "axios";
import useToken from "./useToken";

export default function useAuthClient(): Axios {
  const token = useToken();

  const config = {
    baseURL: "http://192.168.1.6:8000",
    headers: {
      Authorization: `TOKEN ${token}`,
    },
  } satisfies AxiosRequestConfig;

  return axios.create(config);
}
