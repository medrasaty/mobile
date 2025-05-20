import { useStorageState } from "@/hooks/useStorageState";
import { UserType } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useAuthSession } from "./store";
import { AuthUser } from "./types";
import { login } from "./requests";
import { loginCredentials as Credentials } from "./types";
import { t } from "i18next";
import { ProfileQueryKeys } from "@features/profile/keys";

export type Session = {
  user: AuthUser;
  token: string;
};

export type AuthSession = {
  signIn: (credentials: Credentials) => Promise<Session>;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
};

export const AuthContext = React.createContext<AuthSession>({
  // initial values
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: true,
});

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const clearStoreSession = useAuthSession((state) => state.clearSession);

  const [[_, user], setUser] = useStorageState("user");

  const queryClient = useQueryClient();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credentials: Credentials) =>
          await signIn(credentials, setSession, setUser),
        signOut: () => {
          // remove profile data from cache
          queryClient.removeQueries({ queryKey: ProfileQueryKeys.profile });
          // set token to null
          setSession(null);
          clearStoreSession();
        },

        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

async function signIn(
  credentials: Credentials,
  setSession: (session: string | null) => void,
  setUser: (user: string | null) => void
): Promise<Session> {
  /**
   * This function should handle authenticating logic,
   * - get credentials
   * - validate credentials in the server ( send them to the server )
   * - if valid, set session id
   * - if not valid, throw an error
   */

  try {
    let { user, token } = await login(credentials);
    if (user.type !== UserType.STUDENT && user.type !== UserType.TEACHER) {
      // Use English key and translate in UI
      throw new Error("auth.error_invalid_user_type", {
        cause: "INVALID_USER_TYPE",
      });
    }

    // Zustand Store for session management
    useAuthSession.setState({ session: { user, token } });

    // convert user and token to serialized string
    const session = JSON.stringify({ user, token });
    setUser(JSON.stringify(user));
    setSession(session);
    return { user, token };
  } catch (error) {
    // check if  error is of type AxiosError
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        throw new Error(t("auth.error_invalid_credentials"), {
          cause: "INVALID_CREDENTIALS",
        });
      } else if (error?.response?.status === 500) {
        throw new Error("auth.error_server");
      } else {
        throw new Error("auth.error_unknown", { cause: "UNKNOWN_ERROR" });
      }
    }

    throw error; // rethrow the error for the caller to handle
  }
}
