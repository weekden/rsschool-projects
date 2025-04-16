import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatView } from './chatView';

export class ChatController {
  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel,
    private readonly view: ChatView
  ) {}
}
