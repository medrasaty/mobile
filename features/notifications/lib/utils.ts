import { Notification, NotificationRef } from "@/types/notifications.type";
import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Application from "expo-application";
import { LocalDeviceInfo } from "../types";

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const grouped: Record<string, Notification[]> = notifications.reduce(
    (acc, notification) => {
      const date = new Date(notification.created).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    },
    {} as Record<string, Notification[]>
  );

  return Object.entries(grouped).map(([date, items]) => ({
    title: date,
    data: items,
  }));
};

export const parseNotificationRef = (
  notification: Notification
): NotificationRef => {
  return JSON.parse(notification.notification.ref);
};

/**
 * Collects device information using expo-device
 * @returns An object containing all available device information
 */
export const getDeviceInfo = async (): Promise<LocalDeviceInfo> => {
  try {
    // Get device type as string
    const deviceTypeMap: Record<number, string> = {
      [Device.DeviceType.UNKNOWN]: "UNKNOWN",
      [Device.DeviceType.PHONE]: "PHONE",
      [Device.DeviceType.TABLET]: "TABLET",
      [Device.DeviceType.DESKTOP]: "DESKTOP",
      [Device.DeviceType.TV]: "TV",
    };

    // Get device type (asynchronously for more accurate results)
    const deviceType = await Device.getDeviceTypeAsync();
    const deviceTypeString = deviceTypeMap[deviceType] || "UNKNOWN";

    // Generate a unique device ID
    // On iOS we use identifierForVendor, on Android we use a combination of values
    let deviceId = "";
    if (Platform.OS === "ios") {
      deviceId = (await Application.getIosIdForVendorAsync()) || "";
    } else {
      // For Android, create a composite ID from available values
      deviceId = `${Device.modelName || ""}-${Device.osBuildId || ""}-${
        Device.totalMemory || ""
      }`;
    }

    return {
      device_id: deviceId,
      brand: Device.brand,
      model_name: Device.modelName,
      device_name: Device.deviceName,
      device_type: deviceTypeString,
      os_name: Device.osName,
      os_version: Device.osVersion,
      platform_api_level: Device.platformApiLevel,
    };
  } catch (error) {
    console.error("Error getting device info:", error);

    // Return default values if there's an error
    return {
      device_id: "unknown",
      brand: null,
      model_name: null,
      device_name: null,
      device_type: "UNKNOWN",
      os_name: null,
      os_version: null,
      platform_api_level: null,
    };
  }
};

