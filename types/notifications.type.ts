import { Answer, Question, Reply } from "./forum.types";

export interface Notification {
  id: string;
  notification: BaseNotification;
  is_read: boolean;
  created: Date;
}

export interface BaseNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  instance_id: string;
  ref: string;
  created: Date;
}

export interface NotificationRef {
  question: Question["id"];
  answer?: Answer["id"] | null;
  reply?: Reply["id"] | null;
}

export enum NotificationType {
  Question = "QUESTION",
  Answer = "ANSWER",
  Reply = "REPLY",
  Other = "OTHER",
}

export interface Registry {
  id: string;
  question: string;
}
