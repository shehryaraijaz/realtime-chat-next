"use client"

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { client } from "@/lib/client"

export default function Home() {

  const [username, setUsername] = useState<string | null>('');

  const ANIMALS = ['penguin', 'wolf', 'leapord', 'cat', 'dinasour']

  const randomWord = async () => {
    const response = await fetch(`https://random-word-api.herokuapp.com/word`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const word = await response.json();
    return word[0];
  }

  const generateUsername = (word: string) => {
    const username = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
    return `${word}-${username}-${nanoid(5)}`
  }

  const STORAGE = "custom-username"

  useEffect(() => {
    const initUsername = async () => {   
      const user = await client.get() 
      const storedUsername = localStorage.getItem(STORAGE)
      if (storedUsername) {
        setUsername(storedUsername)
        return;
      }

      const word = await randomWord()
      const getUsername = generateUsername(word)
      localStorage.setItem(STORAGE, getUsername)
      setUsername(getUsername)
  }

  initUsername();
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500"><span className="animate-pulse">{">"}</span>private_chat</h1>
          <p className="text-zinc-500 text-sm">private, self-destructing chat room.</p>
        </div>

        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">Your Identity</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">{username}</div>
              </div>
            </div>
          </div>

          <button className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">CREATE ROOM</button>
        </div>
      </div>
    </div>
  );
}
