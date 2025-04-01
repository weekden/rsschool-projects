import { createElement } from '../../../utils/dom/createElement';
import { GarageModel } from '../../garage/model';

export class CountView {
  private countContainer: HTMLElement;
  private countText: HTMLElement;
  private pageText: HTMLElement;

  constructor(private readonly model: GarageModel) {
    this.countText = createElement({
      tag: 'span',
      classes: ['count-item', 'count-item__cars'],
      text: `Garage (0)`,
    });

    this.pageText = createElement({
      tag: 'span',
      classes: ['count-item', 'count-item__page'],
      text: `Page: 1`,
    });

    this.countContainer = createElement({
      tag: 'div',
      classes: ['count', 'counter-wrapper'],
      children: [this.countText, this.pageText],
    });
  }

  public updateCount(): void {
    const count = this.model.getCarsCount();
    this.countText.textContent = `Garage (${count})`;
  }

  public updatePage(): void {
    const currentPage = this.model.getPageNumber();
    this.pageText.textContent = `Page: ${currentPage}`;
  }

  public render(): HTMLElement {
    return this.countContainer;
  }
}
