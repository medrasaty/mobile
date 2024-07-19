export interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created: Date;
  type: string;
  instance_id: string;
}
