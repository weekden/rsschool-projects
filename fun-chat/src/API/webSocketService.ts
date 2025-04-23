import { WSAuthRequest, WSAuthResponse } from './auth/types';
import { WSChatRequest, WSChatResponse } from './chat/types';

export default class WebSocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((data: WSAuthResponse | WSChatResponse) => void) | null = null;
  private onMessageCallbackRouting: ((data: WSAuthResponse | WSChatResponse) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onDisconnectCallback: (() => void) | null = null;
  private onReconnectCallback: (() => void) | null = null;

  constructor(private url: string) {}

  public connect(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.socket) {
        this.socket.removeEventListener('close', this.handleDisconnect);
        this.socket.removeEventListener('error', this.handleDisconnect);
        this.socket.close();
      }
      this.socket = new WebSocket(this.url);
      this.socket.addEventListener('open', () => {
        if (this.onReconnectCallback) this.onReconnectCallback();
        resolve();
      });
      this.socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'ERROR' && this.onErrorCallback) {
            this.onErrorCallback(data.payload.error);
            return;
          }
          if (this.onMessageCallback) this.onMessageCallback(data);

          if (this.onMessageCallbackRouting) this.onMessageCallbackRouting(data);
        } catch {
          console.error('[WebSocket] Invalid JSON:', event.data);
        }
      });

      this.socket.addEventListener('close', this.handleDisconnect);
      this.socket.addEventListener('error', this.handleDisconnect);
    });
  }

  public send(message: WSAuthRequest | WSChatRequest): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('[WebSocket] Cannot send, socket not open');
    }
  }

  public onMessage(callback: (data: WSAuthResponse | WSChatResponse) => void): void {
    this.onMessageCallback = callback;
  }

  public onMessageRouting(callback: (data: WSAuthResponse | WSChatResponse) => void): void {
    this.onMessageCallbackRouting = callback;
  }

  public onError(callback: (message: string) => void): void {
    this.onErrorCallback = callback;
  }

  public onDisconnect(callback: () => void): void {
    this.onDisconnectCallback = callback;
  }

  public onReconnect(callback: () => void): void {
    this.onReconnectCallback = callback;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private handleDisconnect = (): void => {
    if (this.onDisconnectCallback) this.onDisconnectCallback();
    setTimeout(() => {
      this.connect();
    }, 3000);
  };
}

export const socketService = new WebSocketService('ws://localhost:4000');
// export const socketService = new WebSocketService('wss://mik-aleinik.by/chat');
