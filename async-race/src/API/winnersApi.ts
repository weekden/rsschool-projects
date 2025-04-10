import type { WinnerItem, WinnersPageData, WinnersTableResponse } from '../types';
const WINNERS_URL = 'http://localhost:3000/winners';
export class WinnerApi {
  public static async getWinner(id: number): Promise<WinnerItem> {
    const response = await fetch(`${WINNERS_URL}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Winner not found');
    }

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

  public static async deleteWinner(id: number): Promise<void> {
    const response = await fetch(`${WINNERS_URL}/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  public static async updateWinner(id: number, data: { wins: number; time: number }): Promise<WinnerItem> {
    const response = await fetch(`${WINNERS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  public static async getWinnersPage({ page, limit, sort, order }: WinnersTableResponse): Promise<WinnersPageData> {
    const url = `${WINNERS_URL}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url);
    const winners: WinnerItem[] = await response.json();
    const totalCount = Number(response.headers.get('X-Total-Count')) || 0;

    return { winners, totalCount };
  }

  public static async saveWinner(winner: WinnerItem): Promise<void> {
    try {
      const existingWinner = await this.getWinner(winner.id);
      if (existingWinner) {
        const updatedWinner = {
          wins: existingWinner.wins + 1,
          time: Math.min(existingWinner.time, winner.time),
        };
        await this.updateWinner(winner.id, updatedWinner);
      }
    } catch {
      console.error('Winner not found, creating new winner');
      await this.createWinner(winner);
    }
  }
}
