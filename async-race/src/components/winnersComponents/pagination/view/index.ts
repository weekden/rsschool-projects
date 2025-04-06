// import { createElement } from '../../../utils/dom/createElement';
// import { createButton } from '../../../utils/dom/createButton';
// import { GarageModel } from '../../../models/garageModel';
// import { AppModel } from '../../../models/appModel';

import { createElement } from '../../../../utils/dom/createElement';
import { createButton } from '../../../../utils/dom/createButton';
import { AppModel } from '../../../../models/appModel';
import { WinnersModel } from '../../../../models/winnersModel';

export class PaginationView {
  public buttonPrew: HTMLButtonElement;
  public buttonNext: HTMLButtonElement;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: WinnersModel
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
    const currentPage = this.appModel.getPageNumber('winners');
    const totalCars = this.model.getWinnersCount();
    const carsAtPage = 10;
    const lastPage = Math.ceil(totalCars / carsAtPage);
    this.buttonPrew.disabled = currentPage === 1;
    this.buttonNext.disabled = currentPage >= lastPage;
  }
}
