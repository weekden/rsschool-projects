import { getGifts, getRandomArray } from './data.js';
import { appendCardInGiftsContainer } from './card.js';

const gifts = await getGifts();

const giftsContainer = document.querySelector('.gifts__container');
const routeHomePage = `././src/img/`;

appendCardInGiftsContainer(getRandomArray(gifts).slice(0,4), giftsContainer, routeHomePage);

