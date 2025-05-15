import { AuthContext, AuthSession } from "@/features/auth/ctx";
import * as React from "react";

/**
 * Return the auth context value.
 */
export function useSession(): AuthSession {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be used within a <SessionProvider>");
    }
  }

  return value;
}
