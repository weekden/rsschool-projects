import { createElement } from '../../utils/dom/createElement';

export class Count {
  private countContainer: HTMLElement;
  private countText: HTMLElement;
  private pageText: HTMLElement;
  private coinCars: number;
  private currentPage: number;

  constructor(coinCars = 0, currentPage = 1) {
    this.coinCars = coinCars;
    this.currentPage = currentPage;

    this.countText = createElement({
      tag: 'span',
      classes: ['count-item', 'count-item__cars'],
      text: `Garage (${this.coinCars})`,
    });

    this.pageText = createElement({
      tag: 'span',
      classes: ['count-item', 'count-item__page'],
      text: `Page: ${this.currentPage}`,
    });

    this.countContainer = createElement({
      tag: 'div',
      classes: ['count', 'counter-wrapper'],
      children: [this.countText, this.pageText],
    });
  }

  public updateCount(coinCars: number): void {
    this.coinCars = coinCars;
    this.countText.textContent = `Garage (${this.coinCars})`;
  }

  public updatePage(currentPage: number): void {
    this.currentPage = currentPage;
    this.pageText.textContent = `Page: ${this.currentPage}`;
  }

  public render(): HTMLElement {
    return this.countContainer;
  }
}
