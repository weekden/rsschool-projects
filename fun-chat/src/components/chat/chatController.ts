import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';
import { logoutUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { router } from '../../app';
import { getAllAuthUsers, getAllUnauthorizedUsers } from '../../API/chat/reqests';

export class ChatController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel,
    private readonly view: ChatView
  ) {
    this.addEventListeners();

    getAllAuthUsers();
    getAllUnauthorizedUsers();

    socketService.onMessage((data) => {
      if (data.type === 'USER_LOGOUT') {
        router.navigate('/login');
        console.log(`user ${data.payload.user.login} exit`);
      }

      if (data.type === 'USER_INACTIVE') {
        console.log(data.payload.users);
      }
    });
  }
  private addEventListeners(): void {
    const buttonExit = this.view.getButtonExit();
    buttonExit.addEventListener('click', () => {
      const user = this.appModel.getUser();
      if (user) logoutUser(user);
    });
  }
}
