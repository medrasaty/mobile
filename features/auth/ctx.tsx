import { API_URL } from "@/constants";
import { useStorageState } from "@/hooks/useStorageState";
import { BaseSessionUser, UserType } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import { useAuthSession } from "./store";

export type Session = {
  user: BaseSessionUser;
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
          queryClient.removeQueries({ queryKey: ["profile"] });
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

export type Credentials = {
  username: string;
  password: string;
};

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
    let { user, token } = await ServerLogin(credentials);

    if (user.type !== UserType.STUDENT && user.type !== UserType.TEACHER) {
      throw new Error("لا يمكنك تسجيل الدخول، يجب ان تكون إما طالب او معلم", {
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
        throw new Error("اسم المستخدم او كلمة المرور غير صحيحة", {
          cause: "INVALID_CREDENTIALS",
        });
      } else if (error?.response?.status === 500) {
        throw new Error("حدث خطأ ما، حاول مجدداً  في وقت لاحق");
      } else {
        throw new Error(
          "حدث خطأ اثناء محاولة تسجيل الدخول, تحقق من اتصال جهازك بالانترنت ثم حاول مجدداً",
          { cause: "UNKNOWN_ERROR" }
        );
      }
    }

    throw error; // rethrow the error for the caller to handle
  }
}

async function ServerLogin(credentials: Credentials): Promise<Session> {
  /**
   * Validate credentials in the server,
   * if valie, return session id ( token )
   * @param credentials : Credentials object
   */

  const encodedCredentials = btoa(
    `${credentials.username}:${credentials.password}`
  );

  const config = {
    method: "post",
    url: "/auth/login/",
    baseURL: API_URL,
    headers: {
      Authorization: "Basic " + encodedCredentials,
    },
  } satisfies AxiosRequestConfig;

  // error will be thrown automatically if login failed
  let response = await axios.request(config);
  return response.data;
}
