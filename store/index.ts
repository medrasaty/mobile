import { create } from "zustand";
import {
  createNotificationSlice,
  NotificationSlice,
} from "./slices/notifications";

type StoreState = NotificationSlice; // Extend this type as you add more slices

// Initialize store with all slices
const useStore = create<StoreState>()((set, get) => ({
  ...createNotificationSlice(set, get),
}));

export default useStore;
