export interface LocalDeviceInfo {
  device_id: string;
  brand: string | null;
  model_name: string | null;
  device_name: string | null;
  device_type: string;
  os_name: string | null;
  os_version: string | null;
  platform_api_level: number | null;
}

export interface Device {
  active: boolean;
  brand: string;
  device_id: string;
  device_name: string;
  device_type: string;
  expo_push_token: string;
  model_name: string;
  name: string | null;
  os_name: string;
  os_version: string;
  platform_api_level: number;
}
