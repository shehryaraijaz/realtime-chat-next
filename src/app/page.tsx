"use client";

import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const errorMessages: Record<string, string> = {
  "room-not-found-404": "The room does not exist.",
  "room-full": "This room is already full.",
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useUsername();

  const router = useRouter();

  const params = useSearchParams();
  const error = params.get("error");

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

        <div className="flex flex-col items-center">
          {error && (
            <p className="text-sm text-red-500">
              {errorMessages[error] ??
                "Something went wrong. Please try again."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
