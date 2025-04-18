import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';
import { logoutUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { router } from '../../app';
import { getAllAuthUsers, getAllUnauthorizedUsers, sendingMessage } from '../../API/chat/reqests';
import { WSAuthResponse } from '../../API/auth/types';
import { WSChatResponse } from '../../API/chat/types';

export class ChatController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel,
    private readonly view: ChatView
  ) {
    this.addEventListeners();
    this.model.subscribeUsersListener(() => this.handleModelUpdateUsersList());
    this.model.subscribeActiveChatUserListener(() => this.handleModelUpdateMessageInputCotainer());
    getAllAuthUsers();
    getAllUnauthorizedUsers();
    socketService.onMessage((data) => this.handleSocketMessage(data));
  }
  private addEventListeners(): void {
    const buttonExit = this.view.getButtonExit();
    const userContainer = this.view.getUserContainer();
    const sendForm = this.view.getChatSendForm();
    if (!buttonExit || !userContainer || !sendForm) return;
    buttonExit.addEventListener('click', () => {
      const user = this.appModel.getUser();
      if (user) {
        logoutUser(user);
      }
    });

    userContainer.addEventListener('click', (event) => {
      this.handleUserClick(event);
    });

    sendForm.addEventListener('submit', (event) => {
      this.handleSendMessage(event);
    });
  }

  private handleSocketMessage(data: WSAuthResponse | WSChatResponse): void {
    const { type, payload } = data;

    switch (type) {
      case 'USER_ACTIVE':
        this.model.setUsers(payload.users);
        break;

      case 'USER_EXTERNAL_LOGIN':
        this.model.updateUserStatus(payload.user.login, true);
        break;

      case 'USER_EXTERNAL_LOGOUT':
        this.model.updateUserStatus(payload.user.login, false);
        break;

      case 'USER_LOGOUT':
        console.log(`user ${payload.user.login} exit`);
        router.navigate('/login');
        break;

      case 'USER_INACTIVE':
        this.model.setUsers(payload.users);
        console.log('Inactive users:', payload.users);
        break;

      case 'MSG_SEND':
        console.log(payload);
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

  private handleUserClick(event: Event): void {
    if (!(event.target instanceof HTMLElement)) return;
    const userElement = event.target.closest<HTMLElement>('.chat-user');

    if (!userElement) return;

    const login = userElement.getAttribute('user-data');
    if (!login) return;

    console.log(login);
    this.model.setActiveChatUser(login);
  }

  private handleSendMessage(event: Event): void {
    event.preventDefault();
    const messageInput = this.view.getMessageInput();
    const message = messageInput?.value;
    if (message === '' || !message) return;
    const recipient = this.model.getActiveChatUser();
    sendingMessage(recipient, message);
    messageInput.value = '';
  }
}
