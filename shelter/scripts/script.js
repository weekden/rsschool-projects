const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('nav');
const body = document.querySelector('body');
const linksNavMenu = document.querySelectorAll('.header-content__nav-link');
const shadow = document.querySelector('.shadow');
const headerContent = document.querySelector('.header-content');

const modal = document.querySelector('.popup');
const cardList = document.querySelectorAll('.pets__card');
const modalCloseBtn = document.querySelector('.close-popup');

console.log(cardList);
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

const showModal = () => {
	const scrollbarWidth = getScrollbarWidth();
	body.style.paddingRight = `${scrollbarWidth}px`;
	body.classList.add('no-scroll-modal');
	modal.classList.add('show-popup');
	shadow.classList.add('show');
};

const closeModal = () => {
	body.classList.remove('no-scroll-modal');
	body.style.paddingRight = '';
	modal.classList.remove('show-popup');
	shadow.classList.remove('show');
};

const checkWindowSize = () => {
	if (window.innerWidth < 768) {
		burgerBtn.classList.add('show-burger-btn');
	} else {
		burgerBtn.classList.remove('show-burger-btn');
		checkPage();
	}
};
window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

cardList.forEach((card) => {
	card.addEventListener('click', showModal);
});

burgerBtn.addEventListener('click', toggleNavMenu);
shadow.addEventListener('click', closeNavMenu);
shadow.addEventListener('click', closeModal);
linksNavMenu.forEach(link => link.addEventListener('click', closeNavMenu));
modalCloseBtn.addEventListener('click', closeModal);

