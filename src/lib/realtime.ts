import { Realtime, InferRealtimeEvents } from "@upstash/realtime";
import { redis } from "./redis";
import z from "zod";

const schema = {
  chat: {
    message: z.object({
      id: z.string(),
      sender: z.string(),
      text: z.string(),
      roomId: z.string(),
      token: z.string().optional(),
    }),
    destroy: z.object({
      isDestroyed: z.literal(true),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
