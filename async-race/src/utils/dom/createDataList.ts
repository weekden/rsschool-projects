import { createElement } from './createElement';
export function createDataList(carArray: string[], id: string): HTMLElement {
  const dataList = createElement({ tag: 'datalist', id: id });
  carArray.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    dataList.append(option);
  });
  return dataList;
}
