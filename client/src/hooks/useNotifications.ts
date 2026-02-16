import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllNotifications,
  sendNotification,
} from "@/services/notificationService";
import { queryKeys } from "@/lib/queryKeys";

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: getAllNotifications,
  });
}

export function useSendNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      subject,
      recipients,
    }: {
      articleId: string;
      subject: string;
      recipients: string;
    }) => sendNotification(articleId, { subject, recipients }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}
