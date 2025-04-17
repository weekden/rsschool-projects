import { AppModel } from '../../models/appModel';
import { LoginModel } from '../../models/LoginModel';
import { LoginView } from './loginFormView';
import { validateUsername, validatePassword } from '../../utils/validate/validation';
import type { User } from '../../types';
import { router } from '../../app';
import { loginUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { WSAuthResponse } from '../../API/auth/types';
import { WSChatResponse } from '../../API/chat/types';

export class LoginController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: LoginModel,
    private readonly view: LoginView
  ) {
    socketService.connect();
    this.addEventListeners();
    this.subscribeToModel();
    this.model.subscribePopupListener((message) => this.handleModelShowModal(message));
    socketService.onMessage((data) => this.handleSocketMessage(data));
    socketService.onError((message) => this.handleSocketErrors(message));
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

    buttonSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    buttonInfo.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }

  private handleSubmit(): void {
    const login = this.view.getUsernameInput().value;
    const password = this.view.getPasswordInput().value;

    const isValid = this.validateForm({ login, password });
    if (!isValid) return;

    this.appModel.setUser({ login, password });
    console.log(this.appModel.getUser());
    loginUser({ login, password });
  }

  private validateForm(user: User): boolean {
    const { login, password } = user;
    const isUsernameValid = validateUsername(login);
    const isPasswordValid = validatePassword(password);

    this.model.setStateInputUserName(isUsernameValid);
    this.model.setStateInputPassword(isPasswordValid);

    return isUsernameValid && isPasswordValid;
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

  private clearInputsValue(): void {
    this.view.getUsernameInput().value = '';
    this.view.getPasswordInput().value = '';
  }

  private handleSocketMessage(data: WSAuthResponse | WSChatResponse): void {
    const { type } = data;

    switch (type) {
      case 'USER_LOGIN':
        router.navigate('/chat');
        this.clearInputsValue();
        break;
    }
  }

  private handleSocketErrors(message: string): void {
    switch (message) {
      case 'incorrect password':
        this.model.setPopupMessage(message);
        console.log('Неверный пароль');
        break;
    }
  }

  private handleModelShowModal(message: string): void {
    this.view.showPopup(message);
  }
}
