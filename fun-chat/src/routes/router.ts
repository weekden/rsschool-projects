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

      const userDataString = window.sessionStorage.getItem('funchat');

      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        if (userData.login && userData.password) {
          loginUser(userData);
        } else {
          sessionStorage.removeItem('funchat');
          this.navigate('/login');
        }
      } else {
        this.navigate('/login');
      }

      window.addEventListener('popstate', () => this.loadRoute());
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

    if (type === 'USER_LOGIN') {
      const userDataString = window.sessionStorage.getItem('funchat');

      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        if (userData.login && userData.password) {
          this.appModel.setCurrentUserData(userData);
          router.navigate('/chat');
        }
      }
    }
  }

  private handleSocketErrors(): void {
    window.sessionStorage.clear();
    router.navigate('/login');
  }
}
