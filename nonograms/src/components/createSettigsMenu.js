import { createElement } from '../utilits/createElem';

export function createSettingsMenu(onBack, setSettingsBtn) {
	const settingsAppItemsArr = [
		{ name: 'Sound', button1: 'Off', button2: 'On', default: 'On' },
		{
			name: 'Screen Theme',
			button1: 'Dark',
			button2: 'Light',
			default: 'Light',
		},
	];

	const settingsContainer = createElement({
		tag: 'div',
		classes: ['menu', 'settings-menu', 'bg'],
	});

	const controlContainer = createElement({
		tag: 'div',
		classes: ['record-table-container__buttons'],
		children: [
			createElement({
				tag: 'button',
				text: 'Menu',
				classes: ['btn', 'btn-back'],
			}),
		],
	});

	settingsContainer.append(
		...settingsAppItemsArr.map((item) => {
			const itemContainer = createElement({
				tag: 'div',
				classes: ['settings-menu__item'],
			});

			const buttonId = item.name.toLowerCase().split(' ').join('-');

			const itemNameContainer = createElement({
				tag: 'div',
				text: `${item.name}:`,
				classes: ['settings-menu__label'],
			});

			const buttonsContainer = createElement({
				tag: 'div',
				classes: ['settings-menu__buttons'],
			});

			const itemButton1 = createElement({
				tag: 'button',
				text: item.button1,
				id: `${buttonId}-btn1`,
				classes: ['btn', 'settings-menu__btn'],
				disabled: item.default === item.button1,
			});

			const itemButton2 = createElement({
				tag: 'button',
				text: item.button2,
				id: `${buttonId}-btn2`,
				classes: ['btn', 'settings-menu__btn'],
				disabled: item.default === item.button2,
			});
			buttonsContainer.append(itemButton1, itemButton2);
			itemContainer.append(itemNameContainer, buttonsContainer);

			return itemContainer;
		})
	);
	settingsContainer.addEventListener('click', (event) => {
		const clickedButton = event.target.closest('.settings-menu__btn');
		if (!clickedButton) return;

		const buttonsContainer = clickedButton.closest('.settings-menu__buttons');
		const btn1 = buttonsContainer.children[0];
		const btn2 = buttonsContainer.children[1];

		btn1.disabled = !btn1.disabled;
		btn2.disabled = !btn2.disabled;

		setSettingsBtn(clickedButton.id);
	});

	settingsContainer.prepend(controlContainer);
	settingsContainer.querySelector('.btn-back').addEventListener('click', () => {
		onBack();
	});
	return settingsContainer;
}
