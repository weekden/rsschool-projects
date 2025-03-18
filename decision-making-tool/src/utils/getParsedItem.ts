export const getParsedItem = <T>(key: string, value: T): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return value;
  }

  const parsedValue = JSON.parse(storedValue);
  return parsedValue !== undefined ? parsedValue : value;
};
