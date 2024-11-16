import { renderCard } from './card.js';


const documentBody = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const popup = document.createElement('div');
popup.classList.add('popup');
overlay.append(popup);

export const renderPopup = (_item, _route, _popup) => {
  popup.innerHTML = ''
  popup.append(renderCard(_item, _route, _popup));
  showPopup();
}

const showPopup = () => {
  overlay.classList.add('overlay-show');
  documentBody.classList.add('no-scroll');
}



const closePopup = () => {
  documentBody.classList.remove('no-scroll')
  overlay.classList.remove('overlay-show')
}
overlay.addEventListener('click', event => {
  if (event.target === overlay) closePopup()
})