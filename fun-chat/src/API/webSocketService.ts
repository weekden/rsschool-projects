import { WSRequest, WSResponse } from './auth/types';

export default class WebSocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((data: WSResponse) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  constructor(private url: string) {}

  public connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      console.log('[WebSocket] Connected');
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'ERROR' && this.onErrorCallback) {
          this.onErrorCallback(data.payload.error);
          return;
        }

        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      } catch {
        console.error('[WebSocket] Invalid JSON:', event.data);
      }
    });

    this.socket.addEventListener('close', () => {
      console.log('[WebSocket] Disconnected');
    });

    this.socket.addEventListener('error', (error) => {
      console.error('[WebSocket] Error:', error);
    });
  }

  public send(message: WSRequest): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('[WebSocket] Cannot send, socket not open');
    }
  }

  public onMessage(callback: (data: WSResponse) => void): void {
    this.onMessageCallback = callback;
  }

  public onError(callback: (message: string) => void): void {
    this.onErrorCallback = callback;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const socketService = new WebSocketService('ws://localhost:4000');
