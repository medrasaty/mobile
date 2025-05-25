import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSession } from "./types";
import { AuthUser } from "./types";

const AUTH_SESSION_STORAGE_ID = "auth-session-storage";

const storage = new MMKV({
  id: AUTH_SESSION_STORAGE_ID,
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY ?? "(a?f9;adfj.",
});

type clearSessionReason = "session_expired" | "user_signed_out" | "unknown";

export interface AuthSessionStore {
  session: AuthSession | null;
  clearSession: (reason?: clearSessionReason) => void;
  clearedSessionReason: clearSessionReason | null;
  updateUser: (user: Partial<AuthUser>) => void;
  // TODO: implement these methods later.
  login?: () => void;
  logout?: () => void;
}

export const useAuthSession = create<AuthSessionStore>(
  //@ts-ignore FIXME: fix typescript error
  persist(
    (set) => ({
      session: null,
      clearedSessionReason: null,
      clearSession: (reason?: clearSessionReason) => {
        set({ session: null, clearedSessionReason: reason });
      },
      // TODO: document this.
      updateUser: (user: Partial<AuthUser>) => {
        set((state) => {
          if (!state.session) return state;
          return {
            ...state,
            session: {
              ...state.session,
              user: {
                ...state.session.user,
                ...user,
              },
            },
          };
        });
      },
    }),
    {
      name: AUTH_SESSION_STORAGE_ID,
      storage: createJSONStorage(() => ({
        setItem: (key, value) => storage.set(key, value),
        //@ts-ignore FIXME: fix typescript error
        getItem: (key) => storage.getString(key),
        removeItem: (key) => storage.delete(key),
      })),
    }
  )
);
