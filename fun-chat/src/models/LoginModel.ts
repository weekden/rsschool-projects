export class LoginModel {
  private username: string = '';

  public setUsername(username: string): void {
    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }
}
