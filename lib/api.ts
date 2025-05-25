import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/constants";
import { useAuthSession } from "@features/auth/store";
import { router } from "expo-router";
import { LOGIN_PAGE } from "@/constants/routes";

const UNAUTHERIZED_401 = 401

function handleInvalidToken() {
  // just clear the session and app will automatically redirect to login page.
  useAuthSession.getState().clearSession("session_expired")
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

  const client = axios.create(config);

  client.interceptors.response.use((response) => response, (error: AxiosError) => {
    if (error.response && (error.response?.status === UNAUTHERIZED_401)) {
      handleInvalidToken()
    }
    return Promise.reject(error)
  })

  return client
}

type RequestConfig = AxiosRequestConfig & {
  /**
   * Optional callback invoked with the caught error when the request fails.
   */
  onError?: (error: any) => void;
};

/**
 * A unified function to perform all authenticated requests
 * @param config RequestConfig
 */
/**
 * Sends an HTTP request using an authenticated client and handles errors via an optional callback.
 *
 * @typeParam T - The expected shape of the response data.
 * @param config - Request configuration including Axios options and an optional error handler.
 * @param config.onError - Optional callback invoked with the caught error when the request fails.
 * @returns A promise that resolves with the Axios response containing data of type T.
 * @throws Rethrows the original error after invoking `onError`, if provided.
 * @remarks
 * - Initializes an authenticated client via `AuthClient()`.
 * - Executes the request using the client's `request<T>` method.
 * - If an error occurs:
 *   1. Invokes `onError(error)` if supplied, catching and logging any callback errors.
 *   2. Rethrows the original error to the caller.
 */
export async function request<T>(config: RequestConfig) {
  const client = AuthClient();
  const { onError, ...axiosConfig } = config;

  try {
    const response = await client.request<T>(axiosConfig);
    return response;
  } catch (error: any) {
    if (onError) {
      try {
        onError(error);
      } catch (cbErr) {
        console.error("onError callback failed:", cbErr);
      }
    }
    throw error;
  }
}
