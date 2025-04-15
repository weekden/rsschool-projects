import { InitLogin } from '../components/loginForm';
import { LoginModel } from '../models/LoginModel';
import type { AppModel } from '../models/appModel';

export class LoginPage {
  constructor(private readonly appModel: AppModel) {}

  public render(): HTMLElement {
    const model = new LoginModel();
    const initLogin = new InitLogin(model);
    return initLogin.render();
  }
}
