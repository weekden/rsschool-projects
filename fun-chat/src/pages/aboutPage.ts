import { InitAbout } from '../components/about';
import { AboutModel } from '../models/aboutModel';

export class AboutPage {
  constructor() {}

  public render(): HTMLElement {
    const model = new AboutModel();
    const initAbout = new InitAbout(model);
    return initAbout.render();
  }
}
