import { LoginModel } from '../../models/LoginModel';
import { createButton } from '../../utils/dom/button';
import { createElement } from '../../utils/dom/customElement';
import { createInputElement } from '../../utils/dom/input';
import { createPopup } from '../utils/creteInformPopup';

export class LoginView {
  private usernameInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private form: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private infoButton: HTMLButtonElement;
  private usernameError: HTMLElement;
  private passwordError: HTMLElement;

  constructor(private readonly model: LoginModel) {
    this.form = document.createElement('form');
    this.form.id = 'login-form';

    this.usernameInput = createInputElement({
      type: 'text',
      classes: ['input-text', 'login-form__input'],
      name: 'username',
      placeholder: 'Enter user name',
      required: true,
    });

    this.passwordInput = createInputElement({
      type: 'password',
      classes: ['input-text', 'login-form__input'],
      name: 'password',
      placeholder: 'Enter password',
      required: true,
    });

    this.submitButton = createButton({ text: 'Login', type: 'submit', classes: ['btn', 'login-form__btn'] });
    this.infoButton = createButton({ text: 'Info', classes: ['btn', 'login-form__btn'] });

    this.usernameError = createElement({
      tag: 'span',
      text: 'Длина должна более 4 символов. Используйте буквы и цифры',
      classes: ['login-form__error'],
    });
    this.passwordError = createElement({
      tag: 'span',
      text: `Длина должна более 6 символов\n Используйте прописные и заглавные буквы и цифры`,
      classes: ['login-form__error'],
    });
  }

  public render(): HTMLElement {
    const inputsConrtainer = createElement({
      tag: 'div',
      classes: ['login-form__inputs-container'],
      children: [
        createElement({ tag: 'label', text: 'Username:', children: [this.usernameInput] }),
        this.usernameError,
        createElement({ tag: 'label', text: 'Password:', children: [this.passwordInput] }),
        this.passwordError,
      ],
    });
    this.form.append(inputsConrtainer, this.submitButton, this.infoButton);
    return this.form;
  }

  public getUsernameInput(): HTMLInputElement {
    return this.usernameInput;
  }

  public getPasswordInput(): HTMLInputElement {
    return this.passwordInput;
  }

  public getSubmitButton(): HTMLButtonElement {
    return this.submitButton;
  }

  public getInfoButton(): HTMLButtonElement {
    return this.infoButton;
  }

  public toggleError(type: 'username' | 'password', show: boolean): void {
    const element = type === 'username' ? this.usernameError : this.passwordError;
    element.classList.toggle('error--visible', show);
  }

  public showPopup(message: string): void {
    createPopup(message);
  }
}
