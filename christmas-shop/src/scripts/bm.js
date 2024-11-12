const burgerMenuBtn = document.querySelector('.burger-btn');
const navMenuContainer = document.querySelector('.header__menu');
const navMenuList = document.querySelector('.header__menu-list');

const burgerMenuToggle = () => {
	burgerMenuBtn.classList.toggle('burger-btn__rotate');
	navMenuContainer.classList.toggle('header__menu-active');
};

const closeBurgerMenu = () => {
	burgerMenuBtn.classList.remove('burger-btn__rotate');
	navMenuContainer.classList.remove('header__menu-active');
};

const checkWindiwSize = () => {
	if (window.innerWidth > 768) {
		closeBurgerMenu();
	}
};

window.addEventListener('resize', checkWindiwSize);

burgerMenuBtn.addEventListener('click', burgerMenuToggle);

navMenuList.addEventListener('click', event => {
	const clickedItem = event.target.closest('.header__menu-link');
	event.preventDefault();
	closeBurgerMenu();
	setTimeout(() => {
		window.location.href = clickedItem.href;
	}, 300);
});
