import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSession } from "./types";

const AUTH_SESSION_STORAGE_ID = "auth-session-storage";

const storage = new MMKV({
  id: AUTH_SESSION_STORAGE_ID,
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY ?? "(a?f9;adfj.",
});

export interface AuthSessionStore {
  session: AuthSession | null;
  clearSession: () => void;
}

export const useAuthSession = create<AuthSessionStore>(
  //@ts-ignore FIXME: fix typescript error
  persist(
    (set) => ({
      session: null,
      clearSession: () => {
        set({ session: null });
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
