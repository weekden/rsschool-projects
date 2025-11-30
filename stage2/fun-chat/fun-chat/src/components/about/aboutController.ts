import { AboutModel } from '../../models/aboutModel';
import { AboutView } from './viewAbout';

export class AboutController {
  constructor(
    private readonly model: AboutModel,
    private readonly view: AboutView
  ) {
    this.addEventListeners();
  }
  private addEventListeners(): void {
    const buttonBack = this.view.getBackButton();
    buttonBack.addEventListener('click', () => {
      this.model.goBack();
    });
  }
}
