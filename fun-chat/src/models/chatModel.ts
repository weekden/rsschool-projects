import { UserStatus } from '../types';
export class ChatModel {
  private users: UserStatus[] = [];
  private userListener: (() => void)[] = [];

  public setUsers(users: UserStatus[]): void {
    this.users = [...this.users, ...users];
    this.notifyUserListener();
  }

  public updateUserStatus(login: string, isLogined: boolean): void {
    const user = this.users.find((user) => user.login === login);
    if (user) {
      user.isLogined = isLogined;
      this.notifyUserListener();
    }
  }

  public getUsers(): UserStatus[] {
    return this.users;
  }

  public subscribeUsersListener(callback: () => void): void {
    this.userListener.push(callback);
  }

  private notifyUserListener(): void {
    this.userListener.forEach((callback) => callback());
  }
}
