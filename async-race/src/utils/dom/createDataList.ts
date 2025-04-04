import { createElement } from './createElement';
import type { CarListItem } from '../../types';
export function createDataList(carList: CarListItem[], id: string): HTMLElement {
  const dataList = createElement({ tag: 'datalist', id: id });
  carList.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.brand;
    dataList.append(option);
  });
  return dataList;
}
