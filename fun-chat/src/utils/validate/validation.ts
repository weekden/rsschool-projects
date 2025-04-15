export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 4 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validatePassword = (password: string): boolean => {
  return password.trim().length >= 6 && /\d/.test(password);
};
