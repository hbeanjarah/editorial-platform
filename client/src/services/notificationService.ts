import { api } from "./api";
import type { Notification, SendNotificationResponse } from "@/types";

export async function getAllNotifications(): Promise<Notification[]> {
  const { data } = await api.get("/notifications");

  return data;
}

export async function sendNotification(
  articleId: string,
  body: {
    subject: string;
    recipients: string;
  },
): Promise<SendNotificationResponse> {
  const { data } = await api.post(`/articles/${articleId}/notify`, body);

  return data;
}
