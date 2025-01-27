import { createMenu } from '../components/menu';
import { createLevelsMenu } from '../components/levels';
import { render } from '../index';
export class Game {
	constructor(app) {
		this.app = app;
	}

	start() {
		const mainMenu = createMenu((selectMenu) => {
			if (selectMenu === 'New Game') {
				this.renderLevelsMenu();
			}
		});
		render(mainMenu);
	}

	renderLevelsMenu() {
		const levelsMenu = createLevelsMenu((onBack) => {
			if (onBack);
			this.start();
		});
		render(levelsMenu);
	}
}
