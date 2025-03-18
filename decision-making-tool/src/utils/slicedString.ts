export function getSlicedString(string: string): string {
  const maxLengthString = 15;
  return string.length > maxLengthString ? string.slice(0, maxLengthString) + ' ...' : string;
}
