import { Subscriber } from '../types';

export class LoginModel {
  private stateInputUserName: boolean = false;
  private stateInputPassword: boolean = false;

  private usernameSubscribers: Subscriber[] = [];
  private passwordSubscribers: Subscriber[] = [];

  public setStateInputUserName(state: boolean): void {
    this.stateInputUserName = state;
    this.notifyUsernameSubscribers();
  }

  public getStateInputUserName(): boolean {
    return this.stateInputUserName;
  }

  public setStateInputPassword(state: boolean): void {
    this.stateInputPassword = state;
    this.notifyPasswordSubscribers();
  }

  public getStateInputPassword(): boolean {
    return this.stateInputPassword;
  }

  public subscribeToUsernameChange(subscriber: Subscriber): void {
    this.usernameSubscribers.push(subscriber);
  }

  public subscribeToPasswordChange(subscriber: Subscriber): void {
    this.passwordSubscribers.push(subscriber);
  }

  private notifyUsernameSubscribers(): void {
    this.usernameSubscribers.forEach((callback) => callback());
  }

  private notifyPasswordSubscribers(): void {
    this.passwordSubscribers.forEach((callback) => callback());
  }
}
