const burgerMenuBtn = document.querySelector('.burger-btn');
const navMenuContainer = document.querySelector('.header__menu');
const navMenuList = document.querySelector('.header__menu-list');
const boby = document.querySelector('body');

const burgerMenuToggle = () => {
  const scrollYWidth = `${window.innerWidth - boby.offsetWidth}px`;
	burgerMenuBtn.classList.toggle('burger-btn__rotate');
	navMenuContainer.classList.toggle('header__menu-active');
  boby.style.paddingRight = scrollYWidth;
  boby.classList.toggle('no-scroll');
};

const closeBurgerMenu = () => {
	burgerMenuBtn.classList.remove('burger-btn__rotate');
	navMenuContainer.classList.remove('header__menu-active');
  boby.classList.remove('no-scroll');
  boby.style.paddingRight = 0;
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
