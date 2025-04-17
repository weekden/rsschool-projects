import type { User } from '../types';

export class AppModel {
  private currentUser: User | null = null;
  // private userListeners: Subscriber[] = [];

  public setUser(user: User): void {
    this.currentUser = user;
    // this.notifyCurrentUserListeners();
  }

  public getUser(): User | null {
    return this.currentUser;
  }

  // public subscribeCurrentUserChange(subscriber: Subscriber): void {
  //   this.userListeners.push(subscriber);
  // }

  // private notifyCurrentUserListeners(): void {
  //   this.userListeners.forEach((callback) => callback());
  // }
}
