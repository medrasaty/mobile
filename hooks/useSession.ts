import { AuthContext, AuthSession } from "@/features/auth/ctx";
import * as React from "react";

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
