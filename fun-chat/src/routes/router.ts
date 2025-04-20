import { loginUser } from '../API/auth/reqests';
import { WSAuthResponse } from '../API/auth/types';
import { WSChatResponse } from '../API/chat/types';
import { socketService } from '../API/webSocketService';
import { router } from '../app';
import { AppModel } from '../models/appModel';
import { Routes, User } from '../types';

export class Router {
  private routes: Routes;

  constructor(
    routes: Routes,
    private mainContainer: HTMLElement,
    private appModel: AppModel
  ) {
    this.routes = routes;
    this.initSocketConnection();
  }

  public navigate(path: string): void {
    history.pushState(null, '', path);
    this.loadRoute();
  }

  private initSocketConnection(): void {
    socketService.connect().then(() => {
      socketService.onMessageRouting((data) => this.handleSocketMessage(data));
      socketService.onError(() => this.handleSocketErrors());

      const userData: string | null = window.sessionStorage.getItem('funchat');

      if (userData) {
        const userDataParsed: User = JSON.parse(userData);
        loginUser(userDataParsed);
      } else {
        this.navigate('/login');
      }

      window.addEventListener('popstate', () => this.loadRoute());
      this.loadRoute();
    });
  }

  private loadRoute(): void {
    const path = location.pathname || '/';
    const view = this.routes[path] || this.routes['/not-found'];

    if (view) {
      this.mainContainer.replaceChildren(new view(this.appModel).render());
    }
  }

  private handleSocketMessage(data: WSAuthResponse | WSChatResponse): void {
    const { type } = data;

    // && location.pathname !== '/login'
    if (type === 'USER_LOGIN') {
      const userData: string | null = window.sessionStorage.getItem('funchat');

      if (userData) {
        const userDataParsed: User = JSON.parse(userData);
        this.appModel.setCurrentUserData(userDataParsed);
      }

      router.navigate('/chat');
    }
  }

  private handleSocketErrors(): void {
    window.sessionStorage.clear();
    router.navigate('/login');
  }
}
