import { z } from "zod/v4";

export const SendNotificationSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  recipients: z.string().min(1, "At least one recipient is required"),
});

export type SendNotificationInput = z.infer<typeof SendNotificationSchema>;
