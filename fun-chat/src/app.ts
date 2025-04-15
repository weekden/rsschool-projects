import { AppModel } from './models/appModel';
import { LoginPage } from './pages/loginPage';
import { Router } from './routes/router';
import { Routes } from './types';

export class App {
  constructor() {
    const mainContainer = document.createElement('div');
    document.body.append(mainContainer);

    const routes: Routes = {
      '/': LoginPage,
      '/lodin': LoginPage,
    };

    new Router(routes, mainContainer, new AppModel());
  }
}
