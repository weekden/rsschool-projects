import { AppModel } from '../models/appModel';
import { Routes } from '../types';

export class Router {
  private routes: Routes;

  constructor(
    routes: Routes,
    private mainContainer: HTMLElement,
    private appModel: AppModel
  ) {
    this.routes = routes;
    window.addEventListener('hashchange', () => this.loadRoute());
    this.loadRoute();
  }

  private loadRoute(): void {
    const path = location.hash.slice(1) || '/';
    const view = this.routes[path] || this.routes['/not-found'];

    if (view) {
      this.mainContainer.replaceChildren(new view(this.appModel).render());
    }
  }
}
