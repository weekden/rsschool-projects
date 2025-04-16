import { AppModel } from '../../models/appModel';
import { ChatModel } from '../../models/chatModel';
import { ChatController } from './chatController';
import { ChatView } from './chatView';

export class InitChat {
  private view: ChatView;

  constructor(
    private readonly appModel: AppModel,
    private readonly model: ChatModel
  ) {
    this.view = new ChatView(this.model);
  }

  public render(): HTMLElement {
    new ChatController(this.appModel, this.model, this.view);
    return this.view.render();
  }
}
