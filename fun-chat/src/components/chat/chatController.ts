import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';
import { logoutUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { router } from '../../app';
import {
  deleteMessage,
  editMessage,
  getAllAuthUsers,
  getAllUnauthorizedUsers,
  getHistoryMessages,
  readMessageChangeStatus,
  sendingMessage,
} from '../../API/chat/reqests';
import { WSAuthResponse } from '../../API/auth/types';
import { WSChatResponse } from '../../API/chat/types';

export class ChatController {
  private editingMessageId: string | null = null;
  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel,
    private readonly view: ChatView
  ) {
    this.addEventListeners();
    this.model.subscribeUsersListener(() => this.handleModelUpdateUsersList());
    this.model.subscribeActiveChatUserListener(() => this.handleModelUpdateMessageInputCotainer());
    this.model.subscribeMessagesListener(() => this.handleModelUpdateChat(false));
    getAllAuthUsers();
    getAllUnauthorizedUsers();
    socketService.onMessage((data) => {
      this.handleSocketUsers(data);
      this.handleSocketMessages(data);
    });
  }
  private addEventListeners(): void {
    this.addSearchListener();
    this.addHeaderListeners();
    this.addUserListListener();
    this.addChatListeners();
  }

  private addSearchListener(): void {
    const searchInput = this.view.getSearchInput();
    searchInput?.addEventListener('input', () => {
      const subString = searchInput.value.toLowerCase();
      this.view.renderUsers(subString);
    });
  }

  private addHeaderListeners(): void {
    const buttonExit = this.view.getButtonExit();
    const buttonInfo = this.view.getButtonInfo();

    buttonExit?.addEventListener('click', () => {
      console.log('exit');
      const user = this.appModel.getCurrentUserData();
      if (user) {
        logoutUser(user);
      }
    });

    buttonInfo?.addEventListener('click', () => {
      router.navigate('/about');
    });
  }

  private addUserListListener(): void {
    const userContainer = this.view.getUserContainer();
    userContainer?.addEventListener('click', (event) => {
      this.handleUserClick(event);
    });
  }

  private addChatListeners(): void {
    const sendForm = this.view.getChatSendForm();
    const chatContainer = this.view.getChatContainer();

    sendForm?.addEventListener('submit', (event) => {
      this.handleSendMessage(event);
    });

    chatContainer?.addEventListener('contextmenu', (event) => {
      this.hendleClickToCreateContextMenu(event);
    });

    chatContainer?.addEventListener('click', () => {
      this.handleClickChatContainer();
    });
  }

  private handleSocketUsers(data: WSAuthResponse | WSChatResponse): void {
    const { type, payload } = data;

    switch (type) {
      case 'USER_ACTIVE':
        console.log(payload.users);
        this.model.setUsers(payload.users);
        break;

      case 'USER_INACTIVE':
        console.log(payload.users);
        this.model.setUsers(payload.users);
        break;

      case 'USER_EXTERNAL_LOGIN':
        this.model.updateUserStatus(payload.user.login, true);
        this.model.changeStausDeliveryMessageForFirstLoad(payload.user.login);
        break;

      case 'USER_EXTERNAL_LOGOUT':
        this.model.updateUserStatus(payload.user.login, false);
        break;

      case 'USER_LOGOUT':
        window.sessionStorage.clear();
        router.navigate('/login');
        break;
    }
  }

  private handleSocketMessages(data: WSAuthResponse | WSChatResponse): void {
    const { type, payload } = data;
    const currentUser = this.appModel.getCurrentLogin();
    switch (type) {
      case 'MSG_FROM_USER':
        this.model.addMessage(payload.messages, currentUser);
        break;
      case 'MSG_SEND':
        this.model.addMessage(payload.message, currentUser);
        this.handleModelUpdateChat(true);
        const activeUser = this.model.getActiveChatUser();
        const isFromActiveChat = payload.message.to === currentUser && payload.message.from === activeUser;
        if (isFromActiveChat) {
          readMessageChangeStatus(payload.message.id);
        }
        break;
      case 'MSG_DELIVER':
        console.log('[MSG_DELIVER]', payload.message);
        this.model.changeStatusOfMessage(payload.message.id, payload.message.status);
        break;
      case 'MSG_DELETE':
        this.model.deleteMessageById(payload.message.id);
        break;
      case 'MSG_EDIT':
        this.model.editMessage(payload.message.id, payload.message.text);
        this.model.changeStatusOfMessage(payload.message.id, payload.message.status);
        this.handleModelUpdateChat(false);
        break;
      case 'MSG_READ':
        this.model.changeStatusOfMessage(payload.message.id, payload.message.status);
        this.handleModelUpdateChat(false);
        break;
    }
  }

  private handleModelUpdateUsersList(): void {
    this.view.renderUsers();
    this.view.updateCompanionsContainer();
  }

  private handleModelUpdateMessageInputCotainer(): void {
    this.view.updateInputMessageContainer();
    this.view.updateCompanionsContainer();
  }

  private handleModelUpdateChat(isOnlyOne: boolean): void {
    this.view.renderMessageInChat(isOnlyOne);
  }

  private handleUserClick(event: Event): void {
    if (!(event.target instanceof HTMLElement)) return;
    const userElement = event.target.closest<HTMLElement>('.chat-user');

    if (!userElement) {
      return;
    }

    const login = userElement.getAttribute('user-data');
    if (!login || login === this.model.getActiveChatUser()) {
      return;
    }
    this.model.setActiveChatUser(login);
    getHistoryMessages(login);
    const currentLogin = this.appModel.getCurrentLogin();

    const unreadMessages = this.model.getUnreadMessagesFromUser(login, currentLogin);
    unreadMessages.forEach((message) => readMessageChangeStatus(message.id));
  }

  private handleSendMessage(event: Event): void {
    event.preventDefault();
    const messageInput = this.view.getMessageInput();
    const message = messageInput?.value;
    if (message === '' || !message) return;
    const recipient = this.model.getActiveChatUser();
    if (this.editingMessageId) {
      editMessage(this.editingMessageId, message);
      this.editingMessageId = null;
    } else {
      sendingMessage(recipient, message);
    }
    messageInput.value = '';
  }

  private hendleClickToCreateContextMenu(event: MouseEvent): void {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    const messageElement = event.target.closest<HTMLElement>('.chat-message');
    if (!messageElement) {
      return;
    }
    const messageId = messageElement.getAttribute('message-id');
    if (!messageId) {
      return;
    }
    const contextMenu = this.view.renderContextMenu(messageId, event.clientX, event.clientY);
    contextMenu.addEventListener('click', (event) => {
      this.handlerClickContextMenu(event, messageElement);
    });
  }

  private handleClickChatContainer(): void {
    this.view.removeContextMenu();
  }

  private handlerClickContextMenu(event: MouseEvent, message: HTMLElement): void {
    if (!(event.target instanceof HTMLElement)) return;
    const menu = event.target.closest<HTMLElement>('.context-menu');
    const messageId = menu?.dataset.messageId;
    const deleteButton = event.target.closest('.context-delete');
    const editButton = event.target.closest('.context-edit');
    if (!messageId) {
      return;
    }
    if (deleteButton) {
      deleteMessage(messageId);
      this.model.deleteMessageById(messageId);
      this.view.removeContextMenu();
    } else if (editButton) {
      this.view.removeContextMenu();
      const input = this.view.getMessageInput();
      const textToEdit = message.children[1].textContent;
      if (input && textToEdit) {
        input.value = textToEdit;
      }
      this.editingMessageId = messageId;
    }
  }
}
