import { AppModel } from '../models/appModel';

export class RecordsPage {
  constructor(private appModel: AppModel) {}
  public render(): HTMLElement {
    const container = document.createElement('div');
    container.textContent = 'Records';
    return container;
  }
}
