import { useQuery } from "@tanstack/react-query";
import { getAllNotifications } from "@/services/notificationService";
import { queryKeys } from "@/lib/queryKeys";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: getAllNotifications,
  });
}
