import { LoginModel } from '../../models/LoginModel';
import { createButton } from '../../utils/dom/button';
import { createElement } from '../../utils/dom/customElement';
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
    this.form.id = 'login-form';

    this.submitButton = createButton({ text: 'Login', type: 'submit', classes: ['login-form__btn'] });
    this.infoButton = createButton({ text: 'Info', classes: ['login-form__btn'] });
  }

  public render(): HTMLElement {
    const inputsConrtainer = createElement({
      tag: 'div',
      classes: ['login-form__inputs-container'],
      children: [
        createElement({ tag: 'label', text: 'Username:', children: [this.usernameInput] }),
        createElement({ tag: 'label', text: 'Password:', children: [this.passwordInput] }),
      ],
    });
    this.form.append(inputsConrtainer, this.submitButton, this.infoButton);
    return this.form;
  }
}
