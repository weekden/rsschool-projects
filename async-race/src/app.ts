import { InitNav } from './components/nav';
import { Router } from './routes';
import { MainPage } from './pages/mainPage';
import { RecordsPage } from './pages/recordsPage';
import type { Routes } from './types';
import { AppModel } from './models/appModel';

export class App {
  constructor() {
    const navContainer = new InitNav().init();
    const mainContainer = document.createElement('main');
    document.body.append(navContainer, mainContainer);

    const routes: Routes = {
      '/': MainPage,
      '/records': RecordsPage,
    };

    new Router(routes, mainContainer, new AppModel());
  }
}
