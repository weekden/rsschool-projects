import type { User } from '../types';

export class AppModel {
  private currentUser: User | null = null;

  public setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}
