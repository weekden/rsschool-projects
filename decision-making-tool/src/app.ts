import { MainPage } from './view/pageMain';
import { NotFoundView } from './view/pageNotFound';
import type { Routes } from './types/routes-type';

import './styles/main.scss';

export class App {
  // private readonly container: HTMLElement;
  private readonly routes: Routes;

  constructor() {
    // this.container = document.createElement('div');
    // this.container.classList.add('app-container');
    // document.body.append(this.container);

    if (!location.hash) {
      location.hash = '/';
    }

    this.routes = {
      '/': MainPage,
      '/not-found': NotFoundView,
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
