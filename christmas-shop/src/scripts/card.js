import { createPopupDescription } from './popup.js';
export let giftCard;
export let giftDescription;
export let giftDescriptionContainer;

export const renderCard = (_item, _route, _popup = false) => {
	giftCard = document.createElement('div');
	giftDescriptionContainer = document.createElement('div');
	giftDescription = document.createElement('div');
	const giftImg = document.createElement('img');
	const giftType = document.createElement('p');
	const giftName = document.createElement('h3');
	giftCard.classList.add('gift__card');
	giftDescriptionContainer.classList.add('gift-container');

	giftDescription.classList.add('gift-container__description');
	giftType.classList.add('gift__type');
	giftName.classList.add('gift__name');
	giftCard.setAttribute('data-index-card', `${_item.atribute}`);

	giftImg.src = `${_route}gift-${_item.category}.png`;
	giftImg.alt = 'gift-img';
	giftType.textContent = _item.category;
	giftType.style.color = _item.color;
	giftName.textContent = _item.name;

	giftDescription.append(giftType, giftName);

	if (_popup) {
		createPopupDescription(_item);
	}

	giftDescriptionContainer.append(giftDescription);
	giftCard.append(giftImg, giftDescriptionContainer);
	return giftCard;
};

const addColorForTypeGift = (obj, str) => {
	switch (str) {
		case 'for-work':
			obj.color = '#4361ff';
			break;
		case 'for-harmony':
			obj.color = '#ff43f7';
			break;
		case 'for-health':
			obj.color = '#06a44f';
			break;
		default:
			break;
	}
};

export const appendCardInGiftsContainer = (_gifts, _container, _route) => {
	_container.innerHTML = '';
	_gifts.forEach(item => {
		addColorForTypeGift(item, item.category);
		_container.append(renderCard(item, _route));
	});
};
