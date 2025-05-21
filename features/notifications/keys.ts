/**
 * ReactQuery keys for notifications
 */

export const notificationsKeys = {
  all: ["notifications"] as const,
  list: (params: any) => [...notificationsKeys.all, params] as const,
};
