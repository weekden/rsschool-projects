import { ChatMessage, Subscriber, UserStatus } from '../types';
export class ChatModel {
  private messages: Record<string, ChatMessage[]> = {};
  private activeChatUser: string = '';
  private users: UserStatus[] = [];
  private userListener: Subscriber[] = [];
  private activeChatUserListener: Subscriber[] = [];
  private messageListeners: Subscriber[] = [];

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

  public addMessage(message: ChatMessage | ChatMessage[], currentLogin: string): void {
    if (Array.isArray(message)) {
      message.forEach((item) => {
        const chatKey = item.from === currentLogin ? item.to : item.from;
        if (!this.messages[chatKey]) {
          this.messages[chatKey] = [];
        }
        this.messages[chatKey].push(item);
      });
      this.notifyMessageListeners();
    } else {
      const chatKey = message.from === currentLogin ? message.to : message.from;
      if (!this.messages[chatKey]) {
        this.messages[chatKey] = [];
      }
      this.messages[chatKey].push(message);
    }
    this.notifyUserListener();
  }

  public deleteMessageById(messageId: string): void {
    const chatKey = this.getActiveChatUser();

    if (!chatKey || !this.messages[chatKey]) {
      return;
    }
    this.messages[chatKey] = this.messages[chatKey].filter((message) => message.id !== messageId);

    this.notifyMessageListeners();
  }

  public editMessage(messageId: string, text: string): void {
    const chatKey = this.getActiveChatUser();
    if (!chatKey || !this.messages[chatKey]) {
      return;
    }
    const messages = this.messages[chatKey];
    const index = messages.findIndex((message) => message.id === messageId);
    if (index === -1) {
      return;
    }
    this.messages[chatKey][index].text = text;
    this.notifyMessageListeners();
  }

  public clearMessagesHistory(): void {
    const userLogin = this.getActiveChatUser();
    if (userLogin && this.messages[userLogin]) {
      this.messages[userLogin].length = 0;
      this.notifyMessageListeners();
    }
  }

  public changeStatusOfMessage(messageId: string, status: Partial<ChatMessage['status']>): void {
    const chatKey = this.getActiveChatUser();
    if (!chatKey || !this.messages[chatKey]) {
      return;
    }
    const messages = this.messages[chatKey];
    const message = messages.find((message) => message.id === messageId);
    if (!message) {
      return;
    }

    Object.assign(message.status, status);
    this.notifyMessageListeners();
  }

  public changeStausDeliveryMessageForFirstLoad(login: string): void {
    Object.values(this.messages).forEach((allMessage) => {
      allMessage.forEach((message) => {
        if (message.to === login && !message.status.isDelivered) {
          message.status.isDelivered = true;
        }
      });
    });
    console.log(this.messages);
    this.notifyMessageListeners();
  }

  public getUnreadMessagesFromUser(from: string, to: string): ChatMessage[] {
    const messages = this.messages[from] || [];
    return messages.filter(
      (message) => message.from === from && message.to === to && message.status.isDelivered && !message.status.isReaded
    );
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
