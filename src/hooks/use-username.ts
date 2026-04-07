import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState("");

  const BASE_WORD = ["serendipity", "quintessential", "paradigm", "luminescent", "conundrum", "ephemeral", "labyrinth", "eloquence", "mellifluous", "zenith", "alacrity", "sonder", "aurora", "panacea", "vellichor", "sonder", "gossamer", "ethereal", "euphoria", "petrichor", "sonder", "eloquence", "sonder", "aesthetic", "sonder", "sonder", "effervescent", "epoch", "sonder", "sonder"];

  const BASE_ANIMAL = ["dog", "cat", "bird", "fish", "horse", "rabbit", "snake", "tiger", "lion", "bear", "zebra", "giraffe", "elephant", "monkey", "panda", "koala", "fox", "wolf", "rabbit", "snake", "tiger", "lion", "bear", "zebra", "giraffe", "elephant", "monkey", "panda", "koala", "fox", "wolf"];

  const STORAGE = "custom-username";

  const randomAnimal = async () => {
    const word = Math.floor(Math.random() * BASE_ANIMAL.length)
    return BASE_ANIMAL[word].toLowerCase()
  };

  const randomWord = async (): Promise<string> => {
    const word = Math.floor(Math.random() * BASE_WORD.length)
    return BASE_WORD[word];
  };

  const generateUsername = (randomWord: string, randomAnimal: string) => {
    return `${randomWord}-${randomAnimal}-${nanoid(5)}`;
  };

  useEffect(() => {
    const initUsername = async () => {
      const storedUsername = localStorage.getItem(STORAGE);
      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const word = await randomWord();
      const animal = await randomAnimal();
      const getUsername = generateUsername(word, animal);
      localStorage.setItem(STORAGE, getUsername);
      setUsername(getUsername);
    };

    initUsername();
  }, []);

  return { username };
};
