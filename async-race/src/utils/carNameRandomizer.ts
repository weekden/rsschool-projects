import type { CarListItem } from '../types';
export function generateCarName(carList: CarListItem[]): string {
  const randomBrand = carList[Math.floor(Math.random() * carList.length)].brand;
  const randomModel = carList[Math.floor(Math.random() * carList.length)].model;
  return `${randomBrand} ${randomModel}`;
}
