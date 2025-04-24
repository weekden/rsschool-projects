import type { Subscriber, User, UserStatus } from '../types';

export class AppModel {
  private currentUserData: User | null = null;
  private users: UserStatus[] = [];
  private userListener: Subscriber[] = [];

  public getCurrentLogin(): string {
    return this.currentUserData?.login || '';
  }

  public setCurrentUserData(user: User): void {
    this.currentUserData = user;
  }

  public getCurrentUserData(): User | null {
    return this.currentUserData;
  }

  public clearCurrentUserData(): void {
    this.currentUserData = null;
  }

  public setUsers(users: UserStatus[]): void {
    const mergedMap = new Map<string, UserStatus>();

    this.users.forEach((user) => {
      mergedMap.set(user.login, user);
    });

    users.forEach((user) => {
      mergedMap.set(user.login, user);
    });

    this.users = Array.from(mergedMap.values());
    this.notifyUserListener();
  }

  public updateUserStatus(login: string, isLogined: boolean): void {
    const user = this.users.find((user) => user.login === login);

    if (user) {
      user.isLogined = isLogined;
      this.notifyUserListener();
    } else {
      this.setUsers([...this.users, { login, isLogined }]);
    }
  }

  public getUsers(): UserStatus[] {
    return this.users.sort((a, b) => +b.isLogined - +a.isLogined);
  }

  public subscribeUsersListener(callback: () => void): void {
    this.userListener.push(callback);
  }

  private notifyUserListener(): void {
    this.userListener.forEach((callback) => callback());
  }
}
