export class GameArrControl {
	constructor(phar) {
		this.stack = [];
		this.coinKeys = 2;
		this.phar = phar;
	}

	push(item) {
		return this.stack.push(item);
	}

	clearEntry() {
		this.stack = [];
	}

	clearStack() {
		this.stack = [];
		this.coinKeys = 2;
	}

	getStack() {
		return this.stack;
	}

	addElements() {
		this.clearEntry();
		for (let i = 0; i < this.coinKeys; i++) {
			const randomIndex = Math.floor(Math.random() * this.phar.length);
			this.push(this.phar[randomIndex]);
		}
		this.coinKeys += 2;
	}
}
