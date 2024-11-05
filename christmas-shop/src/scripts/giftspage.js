import './card.js';
import {appendCardInGiftsContainer} from './card.js';


    let gifts = null;
    const routeGiftsImg = `../src/img/`
    const pageGiftsContainer = document.querySelector('.page-gifts__container');
    
    fetch('.././src/jsons/giftspage.json')
        .then(response => response.json())
        .then(giftsData => {
            gifts = giftsData;
            appendCardInGiftsContainer(gifts, pageGiftsContainer, routeGiftsImg);
        })
        .catch(error => console.error('Ошибка:', error));

