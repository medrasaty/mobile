import { create } from "zustand";
import { unregisterCurrentDevice } from "./lib/requests";
import Toast from "@/lib/toast";

interface PushNotificationStoreState {
  isRegistered: boolean; // Is the device registered with Expo
  setIsRegistered: (isRegistered: boolean) => void;
  reset: () => void;
}

export const usePushNotificationStore = create<PushNotificationStoreState>(
  (set) => ({
    isRegistered: false,
    setIsRegistered: (isRegistered) => set({ isRegistered }),
    reset: async () => {
      // make http request to the server to unregister the device
      try {
        await unregisterCurrentDevice();
        Toast.success("Device unregistered successfully");
      } catch (error) {
        console.error("Failed to unregister device:", error);
        Toast.error("Failed to unregister device");
      } finally {
        set({
          isRegistered: false,
        });
      }
    },
  })
);
