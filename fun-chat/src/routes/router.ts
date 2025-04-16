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
    window.addEventListener('popstate', () => this.loadRoute());
    this.loadRoute();
  }

  public navigate(path: string): void {
    history.pushState(null, '', path);
    this.loadRoute();
  }

  private loadRoute(): void {
    const path = location.pathname || '/';
    const view = this.routes[path] || this.routes['/not-found'];

    if (view) {
      this.mainContainer.replaceChildren(new view(this.appModel).render());
    }
  }
}
