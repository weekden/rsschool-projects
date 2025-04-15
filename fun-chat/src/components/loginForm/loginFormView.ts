import { LoginModel } from '../../models/LoginModel';
import { createButton } from '../../utils/dom/button';
import { createInputElement } from '../../utils/dom/input';

export class LoginView {
  private usernameInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private infoButton: HTMLButtonElement;

  constructor(private readonly model: LoginModel) {
    this.usernameInput = createInputElement({
      type: 'text',
      classes: ['login-form__input'],
      name: 'username',
      required: true,
    });

    this.passwordInput = createInputElement({
      type: 'password',
      classes: ['login-form__input'],
      name: 'password',
      required: true,
    });

    this.form = document.createElement('form');

    this.submitButton = createButton({ text: 'Login', type: 'submit', classes: ['login-form__btn'] });
    this.infoButton = createButton({ text: 'Info', classes: ['login-form__btn'] });
  }

  public render(): HTMLElement {
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username:';
    usernameLabel.append(this.usernameInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    passwordLabel.append(this.passwordInput);

    this.form.append(usernameLabel, passwordLabel, this.submitButton, this.infoButton);
    return this.form;
  }
}
