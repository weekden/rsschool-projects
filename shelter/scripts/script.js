const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('nav');
const body = document.querySelector('body');
const linksNavMenu = document.querySelectorAll('.header-content__nav-link');
const shadow = document.querySelector('.shadow');

let isActive = true;
const checkStateBody = (isActive) => {
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
	burgerBtn.classList.toggle('active-burger-btn');
	navMenu.classList.toggle('show-nav-menu');
};

const transitionToLink = () => {
	checkStateBody(!isActive);
	closeNavMenu();
};

const closeNavMenu = () => {
	burgerBtn.classList.remove('active-burger-btn');
	navMenu.classList.remove('show-nav-menu');
};

// // resize
const checkWindowSize = () => {
	if (window.innerWidth < 768) {
		burgerBtn.classList.add('show-burger-btn');
	} else {
		burgerBtn.classList.remove('show-burger-btn');
	}
};

burgerBtn.addEventListener('click', toggleNavMenu);
linksNavMenu.forEach(link => link.addEventListener('click', transitionToLink));
window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);
