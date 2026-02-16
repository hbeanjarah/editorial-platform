import { api } from "./api";
import type { Notification } from "@/types";

export async function getAllNotifications(): Promise<Notification[]> {
  const { data } = await api.get("/notifications");

  return data;
}
