import { loginUser } from '../API/auth/reqests';
import { WSAuthResponse } from '../API/auth/types';
import { WSChatResponse } from '../API/chat/types';
import { socketService } from '../API/webSocketService';
import { AppModel } from '../models/appModel';
import { Routes, User } from '../types';

export class Router {
  private routes: Routes;
  private readonly publicRoutes = ['/login', '/about', '/not-found'];
  private isLoggedIn = false;

  constructor(
    routes: Routes,
    private mainContainer: HTMLElement,
    private appModel: AppModel
  ) {
    this.routes = routes;
    this.initSocketConnection();
  }

  public navigate(path: string): void {
    location.hash = path.startsWith('#') ? path : `#${path}`;
  }
  private initSocketConnection(): void {
    socketService.connect().then(() => {
      socketService.onMessageRouting((data) => this.handleSocketMessage(data));
      socketService.onError(() => this.handleSocketErrors());

      const userDataString = window.sessionStorage.getItem('funchat');
      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        if (userData.login && userData.password) {
          this.isLoggedIn = true;
          loginUser(userData);
        } else {
          sessionStorage.removeItem('funchat');
          this.navigate('/login');
        }
      } else {
        this.navigate('/login');
      }
      this.loadRoute();
      window.addEventListener('hashchange', () => this.loadRoute());
    });
  }

  private getCurrentPath(): string {
    const hash = location.hash;
    return hash.startsWith('#') ? hash.slice(1) : '/';
  }

  private loadRoute(): void {
    const path = this.getCurrentPath();

    if (this.isLoggedIn && path === '/login') {
      this.navigate('/chat');
      return;
    }

    if (!this.isLoggedIn && !this.publicRoutes.includes(path)) {
      this.navigate('/login');
      return;
    }

    const view = this.routes[path] || this.routes['/not-found'];

    if (view) {
      this.mainContainer.replaceChildren(new view(this.appModel).render());
    }
  }

  private handleSocketMessage(data: WSAuthResponse | WSChatResponse): void {
    if (data.type === 'USER_LOGIN') {
      const userDataString = window.sessionStorage.getItem('funchat');
      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        if (userData.login && userData.password) {
          this.appModel.setCurrentUserData(userData);
          this.isLoggedIn = true;
          this.navigate('/chat');
        }
      }
    }

    if (data.type === 'USER_LOGOUT') {
      this.isLoggedIn = false;
      this.appModel.clearCurrentUserData();
      window.sessionStorage.clear();
      this.navigate('/login');
    }
  }

  private handleSocketErrors(): void {
    this.isLoggedIn = false;
    window.sessionStorage.clear();
    this.navigate('/login');
  }
}
