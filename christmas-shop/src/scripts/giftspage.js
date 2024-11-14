import { getGifts, getRandomArray } from './data.js';
import { appendCardInGiftsContainer } from './card.js';

const gifts = await getGifts();
const routeGiftsImg = `../src/img/`;
const pageGiftsContainer = document.querySelector('.page-gifts__container');
const tabListContainer = document.querySelector('.page-gifts__tabs');
tabListContainer.firstElementChild.classList.add('active-tab');

appendCardInGiftsContainer(getRandomArray(gifts), pageGiftsContainer, routeGiftsImg);

const filterCardCategory = (_arr, _category) => {
	return _arr.filter(item => item.category === _category);
};

tabListContainer.addEventListener('click', event => {
  const tabList = document.querySelectorAll('.page-gifts__tabs-tab')
	const clickedTab = event.target.closest('.page-gifts__tabs-tab');

  tabList.forEach((item) => {
    item.classList.remove('active-tab');
  });
  clickedTab.classList.add('active-tab');

	if (clickedTab.id === 'all') {
    appendCardInGiftsContainer(getRandomArray(gifts), pageGiftsContainer, routeGiftsImg);
  }
	else appendCardInGiftsContainer(filterCardCategory(gifts, clickedTab.id), pageGiftsContainer, routeGiftsImg);
});