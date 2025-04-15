import { AppModel } from './models/appModel';
import { LoginPage } from './pages/loginPage';
import { Router } from './routes/router';
import { Routes } from './types';
import { createElement } from './utils/dom/customElement';

export class App {
  constructor() {
    const mainContainer = createElement({ tag: 'div', classes: ['app-wrapper'] });
    document.body.append(mainContainer);

    const routes: Routes = {
      '/': LoginPage,
      '/lodin': LoginPage,
    };

    new Router(routes, mainContainer, new AppModel());
  }
}
