import { ChatModel } from '../../models/chatModel';

export class ChatView {
  private container: HTMLDivElement;
  constructor(private readonly view: ChatModel) {
    this.container = document.createElement('div');
  }

  public render(): HTMLDivElement {
    this.container.textContent = 'CHAT';
    return this.container;
  }
}
