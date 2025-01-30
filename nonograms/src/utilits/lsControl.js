export class LSControl {
	constructor() {
		this.lastGameKey = 'saveGame';
		this.resultsKey = 'gameResults';
	}

	saveLastGame(saveGameObj) {
		localStorage.setItem(this.lastGameKey, JSON.stringify(saveGameObj));
	}

	getLastGame() {
		const data = localStorage.getItem(this.lastGameKey);
		return data ? JSON.parse(data) : null;
	}

	saveGameResult(result) {
		const results = this.getGameResults();
		if (results.length >= 5) {
			results.shift();
		}
		results.push(result);
		localStorage.setItem(this.resultsKey, JSON.stringify(results));
	}

	getGameResults() {
		const data = localStorage.getItem(this.resultsKey);
		return data ? JSON.parse(data) : [];
	}
}
