import { request } from "@/lib/api";
import { AuthSession, loginCredentials } from "./types";

/**
 * Validate credentials in the server,
 * if valid, return full session object containing auth token.
 * @param credentials : loginCredentials
 */
export async function login(credentials: loginCredentials) {
  // error will be thrown automatically if login failed
  const response = await request<AuthSession>({
    method: "post",
    url: "/auth/login/",
    auth: {
      username: credentials.email.toLowerCase(),
      password: credentials.password,
    },
  });

  return response.data;
}
