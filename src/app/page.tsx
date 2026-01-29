"use client";

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const errorMessages: Record<string, string[]> = {
  "room-not-found-404": ["ROOM NOT FOUND", "The room does not exist."],
  "room-full": ["ROOM FULL", "This room is already full."],
  "destroyed-true": ["ROOM DESTROYED", "The room is destroyed."],
  "timer-expired": ["TIMER EXPIRED", "The timer has expired."],
  unknown: ["ERROR", "An unexpected error occurred."],
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useUsername();

  const router = useRouter();

  const params = useSearchParams();
  const alert = params.get("alert");

  const alertKey = alert && errorMessages[alert] ? alert : "unknown";

  const activeAlert = alertKey ? errorMessages[alertKey] : null;

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await client.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {activeAlert && (
          <div className="flex flex-col items-center bg-red-800/30 border-3 border-red-800 p-3">
            <h5 className="text-red-500 font-bold">
              {activeAlert[0]}
            </h5>
            <p className="text-zinc-500 text-sm">{activeAlert[1]}</p>
          </div>
        )}

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            <span className="animate-pulse">{">"}</span>private_chat
          </h1>
          <p className="text-zinc-500 text-sm">
            private, self-destructing chat room.
          </p>
        </div>

        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => createRoom()}
            disabled={loading}
            className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "CREATING ROOM.." : "CREATE ROOM"}
          </button>
        </div>
      </div>
    </div>
  );
}
