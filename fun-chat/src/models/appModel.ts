import type { User } from '../types';

export class AppModel {
  private currentUserData: User | null = null;
  private currentLogin: string = '';

  public setCurrentUserData(user: User): void {
    this.currentUserData = user;
  }

  public getCurrentUserData(): User | null {
    return this.currentUserData;
  }

  public setCurrenLogin(login: string): void {
    this.currentLogin = login;
  }

  public getCurrentLogin(): string {
    return this.currentLogin;
  }
}
