import { Subscriber, PopupSubscriber } from '../types';

export class LoginModel {
  private stateInputUserName: boolean = false;
  private stateInputPassword: boolean = false;
  private popupMessage = '';

  private usernameSubscribers: Subscriber[] = [];
  private passwordSubscribers: Subscriber[] = [];
  private popupListeners: PopupSubscriber[] = [];

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

  public setPopupMessage(message: string = ''): void {
    this.popupMessage = message;
    this.notifyPopupListener();
  }

  public getPopupMessage(): string {
    return this.popupMessage;
  }

  public subscribeToUsernameChange(subscriber: Subscriber): void {
    this.usernameSubscribers.push(subscriber);
  }

  public subscribeToPasswordChange(subscriber: Subscriber): void {
    this.passwordSubscribers.push(subscriber);
  }

  public subscribePopupListener(callback: PopupSubscriber): void {
    this.popupListeners.push(callback);
  }

  private notifyUsernameSubscribers(): void {
    this.usernameSubscribers.forEach((callback) => callback());
  }

  private notifyPasswordSubscribers(): void {
    this.passwordSubscribers.forEach((callback) => callback());
  }

  private notifyPopupListener(): void {
    this.popupListeners.forEach((callback) => callback(this.popupMessage));
  }
}
