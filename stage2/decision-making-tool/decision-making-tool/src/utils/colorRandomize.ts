export function generateArrayColor(length: number): string[] {
  const colorArray: string[] = [];
  const letters = '0123456789ABCDEF';
  const colorLength = 6;

  for (let i = 0; i < length; i++) {
    let color = '#';
    for (let j = 0; j < colorLength; j++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    colorArray.push(color);
  }

  return colorArray;
}
