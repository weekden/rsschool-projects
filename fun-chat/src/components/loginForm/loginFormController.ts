import { LoginModel } from '../../models/LoginModel';
import { LoginView } from './loginFormView';
import { validateUsername, validatePassword } from '../../utils/validate/validation';

export class LoginController {
  constructor(
    private model: LoginModel,
    private view: LoginView
  ) {
    this.addEventListeners();
    this.subscribeToModel();
  }
  private addEventListeners(): void {
    const inputUserName = this.view.getUsernameInput();
    const inputPassword = this.view.getPasswordInput();
    const buttonSubmit = this.view.getSubmitButton();
    const buttonInfo = this.view.getInfoButton();

    inputUserName.addEventListener('input', () => {
      const isValid = validateUsername(inputUserName.value);
      this.model.setStateInputUserName(isValid);
    });

    inputPassword.addEventListener('input', () => {
      const isValid = validatePassword(inputPassword.value);
      this.model.setStateInputPassword(isValid);
    });

    buttonSubmit.addEventListener('click', () => {});

    buttonInfo.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }

  private subscribeToModel(): void {
    this.model.subscribeToUsernameChange(() => {
      const hasError = !this.model.getStateInputUserName();
      this.view.toggleError('username', hasError);
    });

    this.model.subscribeToPasswordChange(() => {
      const hasError = !this.model.getStateInputPassword();
      this.view.toggleError('password', hasError);
    });
  }
}
