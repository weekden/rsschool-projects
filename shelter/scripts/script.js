const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('nav');
const body = document.querySelector('body');
const linksNavMenu = document.querySelectorAll('.header-content__nav-link');
const shadow = document.querySelector('.shadow');
const headerContent = document.querySelector('.header-content');

const modal = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.close-popup');
let cardList = null;
const popupImg = document.querySelector('.popup img');
const petName = document.querySelector('.popup-title');
const petType = document.querySelector('.popup-subtitle');
const petDescription = document.querySelector('.popup-description');
const petAge = document.querySelector('.popup-age');
const petInoculations = document.querySelector('.popup-inoculations');
const petDiseases = document.querySelector('.popup-diseases');
const petParasit = document.querySelector('.popup-parasites');

let isActive = true;
let scrollPosition = 0;

const checkPage = () => {
	if (window.innerWidth < 768) {
		if (window.document.title.toLowerCase() === 'shelter-pets') {
			navMenu.classList.add('white-menu');
		} else {
			navMenu.classList.add('dark-menu');
		}
	} else {
		navMenu.classList.remove('white-menu');
		navMenu.classList.remove('dark-menu');
	}
};

const checkStateBody = isActive => {
	if (isActive) {
		body.classList.toggle('no-scroll');
		shadow.classList.toggle('show');
	} else {
		body.classList.remove('no-scroll');
		shadow.classList.remove('show');
	}
};

const toggleNavMenu = () => {
	checkStateBody(isActive);
	checkPage();
	burgerBtn.classList.toggle('active-burger-btn');
	navMenu.classList.toggle('show-nav-menu');
};

const closeNavMenu = () => {
	checkStateBody(!isActive);
	burgerBtn.classList.remove('active-burger-btn');
	navMenu.classList.remove('show-nav-menu');
};

const getScrollbarWidth = () => {
	return window.innerWidth - document.documentElement.clientWidth;
};

function createModal(_cardIndex, _route) {
	const scrollbarWidth = getScrollbarWidth();
	body.style.paddingRight = `${scrollbarWidth}px`;
	body.classList.add('no-scroll-modal');
	fetch(_route)
		.then(response => response.json())
		.then(animalsData => {
			popupImg.src = `../${animalsData[_cardIndex].img}`;
			petName.innerHTML = animalsData[_cardIndex].name;
			petType.innerHTML = `${animalsData[_cardIndex].type} - ${animalsData[_cardIndex].breed}`;
			petDescription.innerHTML = `${animalsData[_cardIndex].description}`;
			petAge.innerHTML = `<span>Age:</span>    ${animalsData[_cardIndex].age}`;
			petInoculations.innerHTML = `<span>Inoculations:</span>   ${animalsData[_cardIndex].inoculations}`;
			petDiseases.innerHTML = `<span>Diseases:</span>   ${animalsData[_cardIndex].diseases}`;
			petParasit.innerHTML = `<span>Parasites:</span>   ${animalsData[_cardIndex].parasites}`;

			console.log('GET ANIMALSDATA=', animalsData);
		})
		.catch(error => console.error('Ошибка:', error));

	modal.classList.add('show-popup');
	shadow.classList.add('show');
};

function showModal() {
    cardList = document.querySelectorAll('.pets__card');
	cardList.forEach(card => {
		card.addEventListener('click', () => {
			const cardIndex = card.getAttribute('data-index-card');
			createModal(cardIndex, '../animals.json');
		});
	});
}

const closeModal = () => {
	body.classList.remove('no-scroll-modal');
	body.style.paddingRight = '';
	modal.classList.remove('show-popup');
	shadow.classList.remove('show');
};

const checkWindowSizeForBuger = () => {
	if (window.innerWidth < 768) {
		burgerBtn.classList.add('show-burger-btn');
	} else {
		burgerBtn.classList.remove('show-burger-btn');
		checkPage();
	}
};

window.addEventListener('load', checkWindowSizeForBuger);
window.addEventListener('resize', checkWindowSizeForBuger);

burgerBtn.addEventListener('click', toggleNavMenu);
shadow.addEventListener('click', closeNavMenu);
shadow.addEventListener('click', closeModal);
linksNavMenu.forEach(link => link.addEventListener('click',(event) =>{
    event.preventDefault()
    closeNavMenu()
    setTimeout(() => {
        window.location.href = link.href; 
    }, 500);
} ));
modalCloseBtn.addEventListener('click', closeModal);


