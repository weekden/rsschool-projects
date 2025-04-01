import type { Car } from '../types';
export function getChunk(data: Car[], slideIndex: number, chunkLength: number): Car[] {
  let chunk = data.slice(slideIndex, slideIndex + chunkLength);
  return chunk;
}
