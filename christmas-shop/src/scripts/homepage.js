import './card.js';
import {appendCardInGiftsContainer} from './card.js';


    let giftsHome = null;
    const giftsContainer = document.querySelector('.gifts__container');
    const routeHomePage = `././src/img/`
    fetch('././src/jsons/homepage.json')
        .then(response => response.json())
        .then(giftsData => {
          giftsHome = giftsData;
            appendCardInGiftsContainer(giftsHome, giftsContainer, routeHomePage);
        })
        .catch(error => console.error('Ошибка:', error));
