
export interface Notification {
    id:           string;
    notification: BaseNotification;
    is_read:      boolean;
}

export interface BaseNotification {
    id:          string;
    title:       string;
    body:        string;
    type:        NotificationType;
    instance_id: string;
    created:     Date;
}

enum NotificationType {
  Question= "QUESTION",
  Answer = "ANSWER",
  Reply = "REPLY",
  Other = "OTHER"
}

export interface Registry {
  id: string;
  question: string;
}
