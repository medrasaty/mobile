import { transformDates } from "@/features/forum/utils";
import { Axios } from "axios";
import { Notification } from "@/types/notifications.type";
import { request } from "@/lib/api";
import { Device, DeviceInfo } from "../types";
import { usePushNotificationStore } from "../store";
import { getDeviceInfo } from "./utils";

export async function getNotifications(
  params: { is_read?: boolean } = {}
): Promise<Notification[]> {
  /**
   * return all notifications for active client,
   * @param {{is_read: boolean}} params: optional params to send with request as url params
   */

  const response = await request<Notification[]>({
    url: "/notifications/notifications/",
    method: "GET",
    params,
  });
  // convert data
  return response.data.results.map(transformDates);
}

export async function readNotification(
  client: Axios,
  notificationId: Notification["id"]
) {
  /**
   * Send a request to the server to read the specified notification
   * @param {string} notificationId: Notification to be read.
   * @param {Axios} client: Axios client to send the notification
   */
  return await client.patch(`/notifications/${notificationId}/read/`);
}

export async function readAllNotifications(client: Axios) {
  return await client.patch("/notifications/notifications/read_all/");
}

type DeviceData = {
  name: string;
  device_id: string;
  expo_push_token: string;
  application_id: string;
};

export async function registerDeviceForPushNotification(
  client: Axios,
  data: DeviceData
) {
  /**
   * register device in the server side for push notification
   * @param {string} client: Axios client to send the request, must be authenticated client
   * @param {string}
   */

  const response = await client.post("/notifications/devices/", data);
  return response.data;
}

export async function registerDevice(
  deviceInfo: DeviceInfo,
  expoPushToken: string
) {
  try {
    const existingDevice = await getDevice(deviceInfo.device_id);

    if (existingDevice) {
      if (existingDevice.active) {
        handleAlreadyRegisteredDevice(deviceInfo.device_id);
        return existingDevice;
      } else {
        await activateDevice(deviceInfo.device_id);
        return existingDevice;
      }
    }
  } catch {
    return await registerNewDevice(deviceInfo, expoPushToken);
  }
}

async function getDevice(deviceId: string) {
  try {
    const response = await request<Device>({
      url: `/notifications/devices/${deviceId}/`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch device:", JSON.stringify(error, null, 2));
    return null;
  }
}

function handleAlreadyRegisteredDevice(deviceId: string) {
  console.warn(`Device with ID ${deviceId} is already registered.`);
  usePushNotificationStore.getState().setIsRegistered(true);
}

async function activateDevice(deviceId: string) {
  try {
    await request({
      url: `/notifications/devices/${deviceId}/activate/`,
      method: "POST",
    });
  } catch (error) {
    console.error("Failed to activate device:", JSON.stringify(error, null, 2));
    throw error;
  }
}

async function registerNewDevice(
  deviceInfo: DeviceInfo,
  expoPushToken: string
) {
  try {
    const response = await request({
      url: "/notifications/devices/",
      method: "POST",
      data: {
        expo_push_token: expoPushToken,
        ...deviceInfo,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to register device:", JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function unregisterCurrentDevice() {
  /**
   * Unregister the device from the server
   * @param {string}
   * deviceId: The ID of the device to Unregister
   * @return {Promise<void>}
   * */
  const { device_id } = await getDeviceInfo();

  const response = await request({
    url: `/notifications/devices/${device_id}/deactivate/`,
    method: "POST",
    onError: (error) => {
      console.error("Failed to deactivate device:", error);
      throw error; // rethrow the error for further handling
    },
  });

  return response.data;
}
