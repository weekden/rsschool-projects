import { ChatMessage, Subscriber, UserStatus } from '../types';
export class ChatModel {
  private messages: Record<string, ChatMessage[]> = {};
  private activeChatUser: string = '';
  private users: UserStatus[] = [];
  private userListener: Subscriber[] = [];
  private activeChatUserListener: Subscriber[] = [];
  private messageListeners: Subscriber[] = [];

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

  public getMessages(): ChatMessage[] {
    const activeUser = this.getActiveChatUser();
    return this.messages[activeUser] || [];
  }

  public addMessage(message: ChatMessage, currentLogin: string): void {
    const chatKey = message.from === currentLogin ? message.to : message.from;

    if (!this.messages[chatKey]) {
      this.messages[chatKey] = [];
    }

    this.messages[chatKey].push(message);
    this.notifyMessageListeners();
  }

  public subscribeUsersListener(callback: () => void): void {
    this.userListener.push(callback);
  }
  public subscribeActiveChatUserListener(callback: () => void): void {
    this.activeChatUserListener.push(callback);
  }

  public subscribeMessagesListener(callback: () => void): void {
    this.messageListeners.push(callback);
  }

  private notifyUserListener(): void {
    this.userListener.forEach((callback) => callback());
  }

  private notifyActiveChatUserListener(): void {
    this.activeChatUserListener.forEach((callback) => callback());
  }

  private notifyMessageListeners(): void {
    this.messageListeners.forEach((callback) => callback());
  }
}
