export const getUsername = (): string => {
  const username = localStorage.get("custom-username");
  if (!username) {
    throw new Error("Username not found in local storage.");
  }

  return username;
};
