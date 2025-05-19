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

export interface AuthSessionStore {
  session: AuthSession | null;
  clearSession: () => void;
  updateSession: (user: AuthUser) => void;
  // TODO: implement these methods later.
  login?: () => void;
  loguot?: () => void;
}

export const useAuthSession = create<AuthSessionStore>(
  //@ts-ignore FIXME: fix typescript error
  persist(
    (set) => ({
      session: null,
      clearSession: () => {
        set({ session: null });
      },
      updateSession: (user: AuthUser) => {
        set((state) => {
          if (!state.session) return state;
          return {
            session: {
              ...state.session,
              user,
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
