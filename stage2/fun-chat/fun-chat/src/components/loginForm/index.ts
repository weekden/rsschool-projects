import { AppModel } from '../../models/appModel';
import { LoginModel } from '../../models/LoginModel';
import { LoginController } from './loginFormController';
import { LoginView } from './loginFormView';

export class InitLogin {
  private view: LoginView;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: LoginModel
  ) {
    this.view = new LoginView(this.model);
  }

  public render(): HTMLElement {
    new LoginController(this.appModel, this.model, this.view);
    return this.view.render();
  }
}
