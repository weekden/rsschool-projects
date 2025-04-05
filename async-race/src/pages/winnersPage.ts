import { InitWinners } from '../components/winners';
import { WinnersModel } from '../components/winners/model';
import { AppModel } from '../models/appModel';

export class RecordsPage {
  constructor(private appModel: AppModel) {}
  public render(): HTMLElement {
    const container = document.createElement('div');
    const model = new WinnersModel();
    const winnersTable = new InitWinners(model).init();
    container.append(winnersTable);
    return container;
  }
}
