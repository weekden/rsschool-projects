import { MainPage } from './view/pageMain';
import { ErrorPage } from './view/pageError';

import type { Routes } from './types/routes-type';

import './styles/main.scss';
import { Decision } from './view/decision-picker';

export class App {
  private readonly routes: Routes;

  constructor() {
    if (!location.hash) {
      location.hash = '/';
    }

    this.routes = {
      '/': MainPage,
      '/decision-picker': Decision,
      '/not-found': ErrorPage,
    };

    window.addEventListener('hashchange', () => this.loadRoute(this.routes));
    this.loadRoute(this.routes);
  }

  private loadRoute(routes: Routes): void {
    const path = location.hash.slice(1) || '/';
    const view = routes[path] || routes['/not-found'];
    if (view) {
      document.body.replaceChildren(new view().render());
    }
  }
}
