import { getGifts, getRandomArray } from './data.js';
import { appendCardInGiftsContainer } from './card.js';
import { renderPopup } from './popup.js';

const gifts = await getGifts();
const giftsContainer = document.querySelector('.gifts__container');
const routeHomePage = `../src/img/`;
if (window.location.pathname.includes('index.html')) {
appendCardInGiftsContainer(getRandomArray(gifts).slice(0, 4), giftsContainer, routeHomePage);

giftsContainer.addEventListener('click', event => {
	const isPopup = true;
	const clickedCard = event.target.closest('.gift__card');
	const cardIndex = +clickedCard.getAttribute('data-index-card');
	const findIndex = gifts.findIndex(item => item.atribute === cardIndex);
	renderPopup(gifts[findIndex], routeHomePage, isPopup);
});
}