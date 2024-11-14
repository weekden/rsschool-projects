import { renderCard } from './card.js';


const documentBody = document.querySelector('body');
const popup = document.createElement('div');
popup.classList.add('popup');


export const renderPopup = (_item, _route, _popup) => {
  popup.innerHTML = ''
  popup.append(renderCard(_item, _route, _popup))
  
  documentBody.append(popup)
}