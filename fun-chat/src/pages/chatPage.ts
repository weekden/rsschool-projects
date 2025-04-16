import { InitChat } from '../components/chat';

import { AppModel } from '../models/appModel';
import { ChatModel } from '../models/chatModel';

export class ChatPage {
  constructor(private readonly appModel: AppModel) {}

  public render(): HTMLElement {
    const model = new ChatModel();
    const initChat = new InitChat(this.appModel, model);
    return initChat.render();
  }
}
