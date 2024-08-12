const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('nav');
const body = document.querySelector('body');
const linksNavMenu = document.querySelectorAll('.header-content__nav-link');
const shadow = document.querySelector('.shadow');
const headerContent = document.querySelector('.header-content');

let isActive = true;
const checkPage = () => {
	if (window.innerWidth < 768) {
		if (window.document.title.toLowerCase() === 'shelter-pets') {
			navMenu.classList.add('white-menu');
		} else {
			navMenu.classList.add('dark-menu');
			console.log('add');
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

// // resize
const checkWindowSize = () => {
	if (window.innerWidth < 768) {
		burgerBtn.classList.add('show-burger-btn');
	} else {
		burgerBtn.classList.remove('show-burger-btn');
		checkPage();
	}
};

burgerBtn.addEventListener('click', toggleNavMenu);
shadow.addEventListener('click', closeNavMenu);
linksNavMenu.forEach(link => link.addEventListener('click', closeNavMenu));
window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

const popup = ` 
        <div class="popup-wrapper">
            <div class="close-popup"></div>
            <div class="popup">
               <div class="part-left"></div>
               <div class="part-right">
                  <p class="popup-title"></p>
                  <p class="popup-subtitle"></p>
                  <p class="popup-description"></p>
                  <li class="popup-li popup-age"></li>
                  <li class="popup-li popup-inoculations"></li>
                  <li class="popup-li popup-diseases"></li>
                  <li class="popup-li popup-parasites"></li>
               </div>
            </div>
         </div>`;


