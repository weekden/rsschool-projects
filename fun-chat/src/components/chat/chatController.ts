import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';
import { logoutUser } from '../../API/auth/reqests';
import { socketService } from '../../API/webSocketService';
import { router } from '../../app';

export class ChatController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel,
    private readonly view: ChatView
  ) {
    this.addEventListeners();
    socketService.onMessage((data) => {
      if (data.type === 'USER_LOGOUT') {
        router.navigate('/login');
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
