import { transformDates } from "@/features/forum/utils";
import { Axios } from "axios";
import { Notification } from "@/types/notifications.type";

export async function getNotifications(
  client: Axios,
  params: { is_read?: boolean } = {}
): Promise<Notification[]> {
  /**
   * return all notifications for active client,
   * @param {Axios} client: current active client
   * @param {{is_read: boolean}} params: optional params to send with request as url params
   */

  const response = await client.get("/notifications/notifications/", {
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
