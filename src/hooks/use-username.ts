import { nanoid, random } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState("");

  const BASE_WORD_API = "https://random-word-api.herokuapp.com";

  const BASE_ANIMAL_API = "https://random-animal-api.vercel.app/api";

  const STORAGE = "custom-username";

  const randomAnimal = async () => {
    const response = await fetch(`${BASE_ANIMAL_API}/random-animal`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const word = await response.json();
    return word["city"].toLowerCase().split(" ")[0];
  };

  const randomWord = async (): Promise<string> => {
    const response = await fetch(`${BASE_WORD_API}/word`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const word = await response.json();
    return word[0];
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
