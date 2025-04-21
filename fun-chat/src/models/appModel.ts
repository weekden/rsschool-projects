import type { User } from '../types';

export class AppModel {
  private currentUserData: User | null = null;

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
}
