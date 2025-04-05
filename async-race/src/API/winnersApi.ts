import type { WinnerItem } from '../types';
const WINNERS_URL = 'http://localhost:3000/winners';
export class WinnerApi {
  public static async getWinner(id: string): Promise<WinnerItem> {
    const response = await fetch(`${WINNERS_URL}/${id}`, {
      method: 'GET',
    });
    return response.json();
  }

  public static async createWinner(winner: WinnerItem): Promise<WinnerItem> {
    const response = await fetch(`${WINNERS_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    return response.json();
  }

  public static async deleteWinner(id: number): Promise<string> {
    const response = await fetch(`${WINNERS_URL}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  public static async updateWinner(winner: WinnerItem): Promise<WinnerItem> {
    const response = await fetch(`${WINNERS_URL}/${winner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });

    return response.json();
  }
}
