export function generateColor(): string {
  const letters = '0123456789ABCDEF';
  const colorLength = 6;
  let color: string = '#';

  for (let j = 0; j < colorLength; j++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}
