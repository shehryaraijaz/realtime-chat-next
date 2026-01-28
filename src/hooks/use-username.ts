import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState("");

  const BASE_API = "https://random-word-api.herokuapp.com";

  const ANIMALS = ["penguin", "wolf", "leapord", "cat", "dinasour"];

  const STORAGE = "custom-username";

  const randomWord = async () => {
    const response = await fetch(`${BASE_API}/word`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const word = await response.json();
    return word[0];
  };

  const generateUsername = (word: string) => {
    const username = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    return `${word}-${username}-${nanoid(5)}`;
  };

  useEffect(() => {
    const initUsername = async () => {
      const storedUsername = localStorage.getItem(STORAGE);
      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const word = await randomWord();
      const getUsername = generateUsername(word);
      localStorage.setItem(STORAGE, getUsername);
      setUsername(getUsername);
    };

    initUsername();
  }, []);

  return { username };
};
