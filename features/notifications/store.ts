import { create } from "zustand";

type PushNotificationStatus =
    "unknown"
    | "enabled"
    | "disabled"
    | "denied"
    | "restricted";
type SyncStatus = "unknown" | "synced" | "not_synced" | "syncing" | "error";

interface PushNotificationStoreState {
    status: PushNotificationStatus; // OS-level permission status
    isRegistered: boolean; // Is the device registered with Expo
    isInSync: boolean; // Is the device registered with the server
    syncStatus: SyncStatus; // More detailed sync status
    lastSyncAt: Date | null;
    error: string | null;

    setStatus: (status: PushNotificationStatus) => void;
    setIsRegistered: (isRegistered: boolean) => void;
    setIsInSync: (isInSync: boolean) => void;
    setSyncStatus: (syncStatus: SyncStatus) => void;
    setLastSyncAt: (date: Date | null) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const usePushNotificationStore = create<PushNotificationStoreState>((set) => ({
    status: "unknown",
    isRegistered: false,
    isInSync: false,
    syncStatus: "unknown",
    lastSyncAt: null,
    error: null,

    setStatus: (status) => set({ status }),
    setIsRegistered: (isRegistered) => set({ isRegistered }),
    setIsInSync: (isInSync) => set({ isInSync }),
    setSyncStatus: (syncStatus) => set({ syncStatus }),
    setLastSyncAt: (date) => set({ lastSyncAt: date }),
    setError: (error) => set({ error }),
    reset: () =>
        set({
            status: "unknown",
            isRegistered: false,
            isInSync: false,
            syncStatus: "unknown",
            lastSyncAt: null,
            error: null,
        }),
}));
