import { request } from "@/lib/api";

export async function registerDevice(
  deviceId: string,
  expoPushToken: string
) {
  const response = await request({
    url: "/notifications/device/",
    method: "POST",
    data: {
      device_id: deviceId,
      expo_push_token: expoPushToken,
    },
  });
}