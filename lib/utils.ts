import { Session } from "@/auth/ctx";

export function parseSession(session: string): Session {
  return JSON.parse(session);
}
