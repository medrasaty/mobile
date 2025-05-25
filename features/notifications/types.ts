export interface DeviceInfo {
  device_id: string;
  brand: string | null;
  model_name: string | null;
  device_name: string | null;
  device_type: string;
  os_name: string | null;
  os_version: string | null;
  platform_api_level: number | null;
}

