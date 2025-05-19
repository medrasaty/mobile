import { request } from "@/lib/api";
import { AuthSession, loginCredentials } from "./types";

export async function login(credentials: loginCredentials) {
  /**
   * Validate credentials in the server,
   * if valid, return session id ( token )
   * @param credentials : Credentials object
   */

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
