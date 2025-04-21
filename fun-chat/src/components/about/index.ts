import { AboutModel } from '../../models/aboutModel';
import { AboutView } from './viewAbout';
import { AboutController } from './aboutController';

export class InitAbout {
  private readonly view: AboutView;

  constructor(private readonly model: AboutModel) {
    this.view = new AboutView();
  }

  public render(): HTMLElement {
    new AboutController(this.model, this.view);
    return this.view.render();
  }
}
