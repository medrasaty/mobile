import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import React from "react";
import { useStorageState } from "./useStorageState";
import { BaseUser, UserType } from "@/definitions/user.types";
import { UserTypes } from "@/definitions/_definitions";
import { LoginError } from "./LoginError";

export type Session = {
  user: BaseUser;
  token: string;
};

type AuthSession = {
  signIn: (credentials: Credentials) => Promise<Session>;
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
    setSession(token);
    // Set current user in the cache
    return { user, token };
  } catch (error) {
    // check if  error is of type AxiosError
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        throw new Error("اسم المستخدم او كلمة المرور غير صحيحة", {
          cause: "INVALID_CREDENTIALS",
        });
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
    baseURL: "http://192.168.1.4:8000",
    headers: {
      Authorization: "Basic " + encodedCredentials,
    },
  } satisfies AxiosRequestConfig;

  // error will be thrown automatically if login failed
  let response = await axios.request(config);
  return response.data;
}
