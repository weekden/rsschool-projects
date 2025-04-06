// import { InitWinners } from '../components/winners';
// import { WinnersModel } from '../components/winners/model';
import { AppModel } from '../models/appModel';
import { InitWinners } from '../components/winnersComponents/winners';
import { WinnersModel } from '../models/winnersModel';
import { InitCount } from '../components/winnersComponents/count';
import { InitPagination } from '../components/winnersComponents/pagination';

export class RecordsPage {
  constructor(private appModel: AppModel) {}
  public render(): HTMLElement {
    const container = document.createElement('div');
    const model = new WinnersModel();
    const winnersTable = new InitWinners(this.appModel, model).init();
    const count = new InitCount(this.appModel, model).init();
    const pagination = new InitPagination(this.appModel, model).init();
    container.append(count, winnersTable, pagination);
    return container;
  }
}
