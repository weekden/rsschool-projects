import { User } from '../types';

export class AppModel {
  private currentUser: User | null = null;

  public setUser(user: User): void {
    this.currentUser = user;
  }

  public getUser(): User | null {
    return this.currentUser;
  }
}
