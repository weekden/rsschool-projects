import { createElement } from '../../../utils/dom/createElement';
import { createButton } from '../../../utils/dom/createButton';
import { GarageModel } from '../../../models/garageModel';
import { AppModel } from '../../../models/appModel';

export class PaginationView {
  public buttonPrew: HTMLButtonElement;
  public buttonNext: HTMLButtonElement;

  constructor(
    private readonly model: GarageModel,
    private readonly appModel: AppModel
  ) {
    this.buttonPrew = createButton({ text: 'prew', classes: ['button', 'pagination-btn', 'pagination-btn__prew'] });
    this.buttonNext = createButton({ text: 'next', classes: ['button', 'pagination-btn', 'pagination-btn__next'] });
    this.updateButtons();
  }

  public render(): HTMLElement {
    const paginationContainer = createElement({ tag: 'div', classes: ['pagination'] });

    paginationContainer.append(this.buttonPrew, this.buttonNext);

    return paginationContainer;
  }

  public updateButtons(): void {
    const currentPage = this.appModel.getPageNumber();
    const totalCars = this.model.getCarsCount();
    const carsAtPage = 7;
    const lastPage = Math.ceil(totalCars / carsAtPage);
    this.buttonPrew.disabled = currentPage === 1;
    this.buttonNext.disabled = currentPage >= lastPage;
  }
}
