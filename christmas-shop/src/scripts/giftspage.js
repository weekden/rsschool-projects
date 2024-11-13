import { getGifts, getRandomArray } from './data.js';
import { appendCardInGiftsContainer } from './card.js';

const gifts = await getGifts();
const routeGiftsImg = `../src/img/`;
const pageGiftsContainer = document.querySelector('.page-gifts__container');


appendCardInGiftsContainer(getRandomArray(gifts), pageGiftsContainer, routeGiftsImg);


