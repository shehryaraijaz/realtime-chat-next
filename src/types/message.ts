import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
  roomId: z.string(),
  token: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
