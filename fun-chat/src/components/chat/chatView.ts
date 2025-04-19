import { ChatModel } from '../../models/chatModel';
import { createElement } from '../../utils/dom/customElement';
import { createButton } from '../../utils/dom/button';
import { createAnchorElement } from '../../utils/dom/anchor';
import { createInputElement } from '../../utils/dom/input';
import { AppModel } from '../../models/appModel';
import { createMessageItem } from '../../utils/elements/createMessageItem';

export class ChatView {
  private container: HTMLElement;
  private usersContainer: HTMLElement | null = null;
  private userNameContainer: HTMLElement | null = null;
  private chatContainer: HTMLElement | null = null;
  private chatSendForm: HTMLElement | null = null;

  private buttonInfo: HTMLButtonElement | null = null;
  private buttonExit: HTMLButtonElement | null = null;
  private searchInput: HTMLInputElement | null = null;

  private messageInput: HTMLInputElement | null = null;
  private sendButton: HTMLButtonElement | null = null;

  private companion: HTMLSpanElement | null = null;
  private companionStatus: HTMLSpanElement | null = null;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel
  ) {
    this.container = createElement({ tag: 'div', classes: ['chat'] });
    this.initHeaderElements();
    this.initUsersElements();
    this.initSendMessageElements();
    this.initCompanionElements();
  }

  public getButtonExit(): HTMLButtonElement | undefined {
    if (this.buttonExit) {
      return this.buttonExit;
    }
  }

  public getUserContainer(): HTMLElement | undefined {
    if (this.usersContainer) {
      return this.usersContainer;
    }
  }

  public getMessageInput(): HTMLInputElement | undefined {
    if (this.messageInput) {
      return this.messageInput;
    }
  }

  public getChatSendForm(): HTMLElement | undefined {
    if (this.chatSendForm) {
      return this.chatSendForm;
    }
  }

  public render(): HTMLElement {
    this.container.append(this.createHeader(), this.createMainContainer(), this.createFooter());
    return this.container;
  }

  public renderUsers(): void {
    if (!this.usersContainer) return;
    const currentUser = this.appModel.getCurrentLogin();
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
      if (this.usersContainer) {
        this.usersContainer.append(userWrapper);
      }
    });
  }

  public updateInputMessageContainer(): void {
    const selectedUser = this.model.getActiveChatUser();

    if (selectedUser && this.messageInput && this.sendButton) {
      this.messageInput.disabled = false;
      this.sendButton.disabled = false;
    }
  }

  public renderMessageInChat(lastOnly = false): void {
    const messages = this.model.getMessages();
    const currentUser = this.appModel.getCurrentLogin();

    if (!messages.length) return;

    if (lastOnly) {
      const lastMessage = messages[messages.length - 1];
      const messageElement = createMessageItem(lastMessage, currentUser);
      this.chatContainer?.append(messageElement);
    } else {
      this.chatContainer?.replaceChildren();
      messages.forEach((message) => {
        const messageElement = createMessageItem(message, currentUser);
        this.chatContainer?.append(messageElement);
      });
    }
  }

  public updateCompanionsContainer(): void {
    if (!this.companion || !this.companionStatus) return;
    const companionLogin = this.model.getActiveChatUser();
    const users = this.model.getUsers();
    const companionData = users.find((user) => user.login === companionLogin);

    if (companionData) {
      this.companion.textContent = companionData.login;
      this.companionStatus.textContent = companionData.isLogined ? 'online' : 'offline';
      this.companionStatus.style.color = companionData.isLogined ? 'green' : 'red';
    } else {
      this.companion.textContent = '';
      this.companionStatus.textContent = '';
    }
  }

  private createMainContainer(): HTMLElement {
    const usersContainer = this.createUsersContainerWrapper();
    const chatContainer = this.createChatWrapper();
    const mainContainer = createElement({ tag: 'div', classes: ['chat-container'] });
    mainContainer.append(usersContainer, chatContainer);
    return mainContainer;
  }

  private createUsersContainerWrapper(): HTMLElement {
    if (!(this.searchInput && this.usersContainer)) {
      return createElement({ tag: 'div' });
    }
    const usersContainerWrapper = createElement({
      tag: 'div',
      classes: ['chat-container__users-wrapper'],
      children: [this.searchInput, this.usersContainer],
    });
    return usersContainerWrapper;
  }

  private createChatWrapper(): HTMLElement {
    if (!(this.chatContainer && this.chatSendForm)) {
      return createElement({ tag: 'div' });
    }
    const chatWrapper = createElement({ tag: 'div', classes: ['chat-container__chat-wrapper'] });

    const messagesWrapper = createElement({
      tag: 'div',
      classes: ['chat-container__messages-wrapper'],
      children: [this.chatContainer],
    });

    const companionContainer = this.createCompanionWrapper();

    chatWrapper.append(companionContainer, messagesWrapper, this.chatSendForm);
    return chatWrapper;
  }

  private createCompanionWrapper(): HTMLElement {
    if (!(this.companion && this.companionStatus)) {
      return createElement({ tag: 'div' });
    }
    const companionWrapper = createElement({
      tag: 'div',
      classes: ['chat-container__companion-wrapper'],
      children: [this.companion, this.companionStatus],
    });
    return companionWrapper;
  }

  private createHeader(): HTMLElement {
    if (!(this.buttonInfo && this.buttonExit && this.userNameContainer)) {
      return createElement({ tag: 'div' });
    }
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

  private initHeaderElements(): void {
    this.userNameContainer = createElement({
      tag: 'span',
      text: this.appModel.getCurrentLogin(),
      classes: ['header__user-name'],
    });
    this.buttonInfo = createButton({
      text: 'Info',
      classes: ['btn', 'header__btn', 'header__btn-info'],
    });
    this.buttonExit = createButton({
      text: 'Exit',
      classes: ['btn', 'header__btn', 'header__btn-exit'],
    });
  }

  private initUsersElements(): void {
    this.usersContainer = createElement({ tag: 'div', classes: ['chat-container__users'] });
    this.searchInput = createInputElement({
      type: 'text',
      placeholder: 'search...',
      classes: ['input-text', 'users-container__input'],
    });
  }

  private initSendMessageElements(): void {
    this.chatContainer = createElement({ tag: 'div', classes: ['chat-container__messages'] });
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

  private initCompanionElements(): void {
    this.companion = createElement({
      tag: 'span',
      classes: ['chat-container__header-span', 'chat-container__header-companion'],
    });
    this.companionStatus = createElement({
      tag: 'span',
      classes: ['chat-container__header-span', 'chat-container__header-companion-status'],
    });
  }
}
