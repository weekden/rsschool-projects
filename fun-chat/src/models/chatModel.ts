import { Subscriber, UserStatus } from '../types';
export class ChatModel {
  private activeChatUser: string = '';
  private users: UserStatus[] = [];
  private userListener: Subscriber[] = [];
  private activeChatUserListener: Subscriber[] = [];

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

  public setActiveChatUser(activeUser: string): void {
    this.activeChatUser = activeUser;
    this.notifyActiveChatUserListener();
  }

  public getActiveChatUser(): string {
    return this.activeChatUser;
  }

  public subscribeUsersListener(callback: () => void): void {
    this.userListener.push(callback);
  }
  public subscribeActiveChatUserListener(callback: () => void): void {
    this.activeChatUserListener.push(callback);
  }

  private notifyUserListener(): void {
    this.userListener.forEach((callback) => callback());
  }

  private notifyActiveChatUserListener(): void {
    this.activeChatUserListener.forEach((callback) => callback());
  }
}
