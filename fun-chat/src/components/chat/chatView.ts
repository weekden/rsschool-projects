import { ChatModel } from '../../models/chatModel';
import { createElement } from '../../utils/dom/customElement';
import { createButton } from '../../utils/dom/button';
import { createAnchorElement } from '../../utils/dom/anchor';
import { createInputElement } from '../../utils/dom/input';
import { AppModel } from '../../models/appModel';

export class ChatView {
  private container: HTMLElement;
  private usersContainer: HTMLElement;
  private userNameContainer: HTMLElement;
  private messagesContainer: HTMLElement;
  private chatSendForm: HTMLElement;

  private buttonInfo: HTMLButtonElement;
  private buttonExit: HTMLButtonElement;
  private searchInput: HTMLInputElement;

  private messageInput: HTMLInputElement;
  private sendButton: HTMLButtonElement;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel
  ) {
    this.container = createElement({ tag: 'div', classes: ['chat'] });
    this.userNameContainer = createElement({
      tag: 'span',
      text: this.appModel.getUser()?.login,
      classes: ['header__user-name'],
    });
    this.usersContainer = createElement({ tag: 'div', classes: ['chat-container__users'] });
    this.buttonInfo = createButton({ text: 'Info', classes: ['btn', 'header__btn', 'header__btn-info'] });
    this.buttonExit = createButton({ text: 'Exit', classes: ['btn', 'header__btn', 'header__btn-exit'] });
    this.searchInput = createInputElement({
      type: 'text',
      placeholder: 'search...',
      classes: ['input-text', 'users-container__input'],
    });
    this.messagesContainer = createElement({ tag: 'div', classes: ['chat-container__messages'] });
    this.messageInput = createInputElement({
      type: 'text',
      placeholder: 'Type a message...',
      classes: ['input-text', 'chat-container__input'],
      disabled: true,
    });
    this.sendButton = createButton({
      text: 'Send',
      type: 'submit',
      classes: ['btn', 'chat-container__send-btn'],
      disabled: true,
    });
    this.chatSendForm = createElement({
      tag: 'form',
      classes: ['chat-container__input-wrapper'],
      children: [this.messageInput, this.sendButton],
    });
  }

  public getButtonExit(): HTMLButtonElement {
    return this.buttonExit;
  }

  public getUserContainer(): HTMLElement {
    return this.usersContainer;
  }

  public getMessageInput(): HTMLInputElement {
    return this.messageInput;
  }

  public getChatSendForm(): HTMLElement {
    return this.chatSendForm;
  }

  public render(): HTMLElement {
    this.container.append(this.createHeader(), this.createMainContainer(), this.createFooter());
    return this.container;
  }

  public renderUsers(): void {
    if (!this.usersContainer) return;
    const currentUser = this.appModel.getUser()?.login;
    const users = this.model.getUsers();
    this.usersContainer.replaceChildren();
    users.forEach((user) => {
      if (user.login === currentUser) return;
      const userWrapper = createElement({ tag: 'div', classes: ['chat-user'] });
      userWrapper.setAttribute('user-data', user.login);

      const statusCircle = createElement({
        tag: 'span',
        classes: ['chat-user__status'],
      });
      statusCircle.style.backgroundColor = user.isLogined ? 'green' : 'black';

      const nameElement = createElement({
        tag: 'span',
        classes: ['chat-user__name'],
      });
      nameElement.textContent = user.login;

      userWrapper.append(statusCircle, nameElement);
      this.usersContainer.append(userWrapper);
    });
  }

  public updateInputMessageContainer(): void {
    const selectedUser = this.model.getActiveChatUser();

    if (selectedUser) {
      this.messageInput.disabled = false;
      this.sendButton.disabled = false;
    }
  }

  private createHeader(): HTMLElement {
    const headerContainer = createElement({ tag: 'div', classes: ['header', 'header-container'] });
    const headerChatName = createElement({ tag: 'span', text: 'Fun Chat', classes: ['header__chat-name'] });
    const headerButtonsWrapper = createElement({
      tag: 'div',
      classes: ['header__buttons-wrapper'],
      children: [this.buttonInfo, this.buttonExit],
    });
    headerContainer.append(this.userNameContainer, headerChatName, headerButtonsWrapper);
    return headerContainer;
  }

  private createFooter(): HTMLElement {
    const footerContainer = createElement({ tag: 'div', classes: ['footer', 'footer-container'] });
    const linkGitHub = createAnchorElement({
      href: 'https://github.com/weekden',
      text: 'Git Hub',
      classes: ['footer-link'],
      target: '_blank',
    });
    const linkRSS = createAnchorElement({
      href: 'https://rs.school/',
      text: 'RSSchool',
      classes: ['footer-link'],
      target: '_blank',
    });

    const yearProdoction = createElement({ tag: 'span', text: '2025' });
    footerContainer.append(linkGitHub, yearProdoction, linkRSS);
    return footerContainer;
  }

  private createMainContainer(): HTMLElement {
    const usersContainer = this.createUsersContainerWrapper();
    const chatContainer = this.createChatWrapper();
    const mainContainer = createElement({ tag: 'div', classes: ['chat-container'] });
    mainContainer.append(usersContainer, chatContainer);
    return mainContainer;
  }

  private createUsersContainerWrapper(): HTMLElement {
    const usersContainerWrapper = createElement({
      tag: 'div',
      classes: ['chat-container__users-wrapper'],
      children: [this.searchInput, this.usersContainer],
    });
    return usersContainerWrapper;
  }

  private createChatWrapper(): HTMLElement {
    const chatWrapper = createElement({ tag: 'div', classes: ['chat-container__chat-wrapper'] });

    const messagesWrapper = createElement({
      tag: 'div',
      classes: ['chat-container__messages-wrapper'],
      children: [this.messagesContainer],
    });

    chatWrapper.append(messagesWrapper, this.chatSendForm);
    return chatWrapper;
  }
}
