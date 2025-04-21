import { Router } from './routes/router';
import { AppModel } from './models/appModel';
import { ChatPage } from './pages/chatPage';
import { LoginPage } from './pages/loginPage';
import { createElement } from './utils/dom/customElement';
import { Routes } from './types';
import { AboutPage } from './pages/aboutPage';

const mainContainer = createElement({ tag: 'div', classes: ['app-wrapper'] });
document.body.append(mainContainer);

const routes: Routes = {
  '/': LoginPage,
  '/login': LoginPage,
  '/chat': ChatPage,
  '/about': AboutPage,
};

export const router = new Router(routes, mainContainer, new AppModel());
