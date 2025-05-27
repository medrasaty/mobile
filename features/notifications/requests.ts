import { request } from "@/lib/api";

export async function registerDevice(deviceId: string, expoPushToken: string) {
  await request({
    url: "/notifications/devices/",
    method: "POST",
    data: {
      device_id: deviceId,
      expo_push_token: expoPushToken,
    },
  });
}

