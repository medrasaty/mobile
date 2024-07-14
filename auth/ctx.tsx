import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { useStorageState } from "./useStorageState";

type AuthSession = {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthSession>({
  // initial values
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: true,
});

export function useSession(): AuthSession {
  /**
   * Return the auth context value.
   */
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be used within a <SessionProvider>");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials: Credentials) =>
          await signIn(credentials, setSession),
        signOut: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export type Credentials = {
  username: string;
  password: string;
};

async function signIn(
  credentials: Credentials,
  setSession: (session: string | null) => void
): Promise<void> {
  /**
   * This function should handle authenticating logic,
   * - get credentials
   * - validate credentials in the server ( send them to the server )
   * - if valid, set session id
   * - if not valid, throw an error
   */
  try {
    let user = await ServerLogin(credentials);
    setSession(user.token);
    // Set current user in the cache
    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error; // rethrow the error for the caller to handle
  }
}

async function ServerLogin(credentials: Credentials) {
  /**
   * Validate credentials in the server,
   * if valie, return session id ( token )
   * @param credentials : Credentials object
   */

  const config = {
    method: "post",
    url: "http://localhost:8000/auth/login/",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(credentials),
  } satisfies AxiosRequestConfig;

  // error will be thrown automatically if login failed
  let response = await axios.request(config);
  return response.data;
}
