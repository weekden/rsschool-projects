import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';
import { logoutUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { router } from '../../app';
import { getAllAuthUsers, getAllUnauthorizedUsers } from '../../API/chat/reqests';
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
    getAllAuthUsers();
    getAllUnauthorizedUsers();
    socketService.onMessage((data) => this.handleSocketMessage(data));
  }
  private addEventListeners(): void {
    const buttonExit = this.view.getButtonExit();
    buttonExit.addEventListener('click', () => {
      const user = this.appModel.getUser();
      if (user) {
        logoutUser(user);
      }
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
    }
  }
  private handleModelUpdateUsersList(): void {
    this.view.renderUsers();
  }
}
