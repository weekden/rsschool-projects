// import { LoginController } from '../controllers/LoginController';
// import { LoginModel } from '../models/LoginModel';
// import { LoginView } from '../views/LoginView';

import { LoginModel } from '../../models/LoginModel';
import { LoginController } from './loginFormController';
import { LoginView } from './loginFormView';

export class InitLogin {
  private view: LoginView;

  constructor(private readonly model: LoginModel) {
    this.view = new LoginView(this.model);
  }

  public render(): HTMLElement {
    new LoginController(this.model, this.view);
    return this.view.render();
  }
}
