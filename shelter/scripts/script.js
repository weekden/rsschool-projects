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

const showModal = cardIndex => {
	const scrollbarWidth = getScrollbarWidth();
	body.style.paddingRight = `${scrollbarWidth}px`;
	body.classList.add('no-scroll-modal');
	fetch('animals.json')
		.then(response => response.json())
		.then(animalsData => {
			const pets = animalsData;
			console.log(pets);
			popupImg.src = `./${pets[cardIndex].img}`;
			petName.innerHTML = pets[cardIndex].name;
			petType.innerHTML = `${pets[cardIndex].type} - ${pets[cardIndex].breed}`;
			petDescription.innerHTML = `${pets[cardIndex].description}`;
			petAge.innerHTML = `<span>Age:</span>    ${pets[cardIndex].age}`;
			petInoculations.innerHTML = `<span>Inoculations:</span>   ${pets[cardIndex].inoculations}`;
			petDiseases.innerHTML = `<span>Diseases:</span>   ${pets[cardIndex].diseases}`;
			petParasit.innerHTML = `<span>Parasites:</span>   ${pets[cardIndex].parasites}`;

			console.log('GET ANIMALSDATA=', animalsData);
		})
		.catch(error => console.error('Ошибка:', error));

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
	// if (window.innerWidth < 1000) {
	// 	chunkLength = 2;
	// 	updateSlider(pets, slideIndex, chunkLength);
	// } else {
	// 	chunkLength = 3;
	// 	updateSlider(pets, slideIndex, chunkLength);
	// }
	if (window.innerWidth < 768) {
		burgerBtn.classList.add('show-burger-btn');
	} else {
		burgerBtn.classList.remove('show-burger-btn');
		checkPage();
	}
    // if (window.innerWidth < 650) {
	// 	chunkLength = 1;
	// 	updateSlider(pets, slideIndex, chunkLength);
	// } else if(window.innerWidth > 650 && window.innerWidth < 1000) {
	// 	chunkLength = 2;
	// 	updateSlider(pets, slideIndex, chunkLength);
	// }
};


window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

burgerBtn.addEventListener('click', toggleNavMenu);
shadow.addEventListener('click', closeNavMenu);
shadow.addEventListener('click', closeModal);
linksNavMenu.forEach(link => link.addEventListener('click', closeNavMenu));
modalCloseBtn.addEventListener('click', closeModal);


























// const burgerBtn = document.querySelector('.burger-btn');
// const navMenu = document.querySelector('nav');
// const body = document.querySelector('body');
// const linksNavMenu = document.querySelectorAll('.header-content__nav-link');
// const shadow = document.querySelector('.shadow');
// const headerContent = document.querySelector('.header-content');

// const modal = document.querySelector('.popup');
// const modalCloseBtn = document.querySelector('.close-popup');
// let cardList = null;
// const popupImg = document.querySelector('.popup img');
// const petName = document.querySelector('.popup-title');
// const petType = document.querySelector('.popup-subtitle');
// const petDescription = document.querySelector('.popup-description');
// const petAge = document.querySelector('.popup-age');
// const petInoculations = document.querySelector('.popup-inoculations');
// const petDiseases = document.querySelector('.popup-diseases');
// const petParasit = document.querySelector('.popup-parasites');

// const slider = document.querySelector('.pets-slider__cards');
// const btnLeft = document.querySelector('#pets-slider__btn-left');
// const btnRight = document.querySelector('#pets-slider__btn-right');

// let slideIndex = 0;
// let chunkLength = 3;
// let isActive = true;
// let scrollPosition = 0;

// const checkPage = () => {
// 	if (window.innerWidth < 768) {
// 		if (window.document.title.toLowerCase() === 'shelter-pets') {
// 			navMenu.classList.add('white-menu');
// 		} else {
// 			navMenu.classList.add('dark-menu');
// 		}
// 	} else {
// 		navMenu.classList.remove('white-menu');
// 		navMenu.classList.remove('dark-menu');
// 	}
// };

// const checkStateBody = isActive => {
// 	if (isActive) {
// 		body.classList.toggle('no-scroll');
// 		shadow.classList.toggle('show');
// 	} else {
// 		body.classList.remove('no-scroll');
// 		shadow.classList.remove('show');
// 	}
// };

// const toggleNavMenu = () => {
// 	checkStateBody(isActive);
// 	checkPage();
// 	burgerBtn.classList.toggle('active-burger-btn');
// 	navMenu.classList.toggle('show-nav-menu');
// };

// const closeNavMenu = () => {
// 	checkStateBody(!isActive);
// 	burgerBtn.classList.remove('active-burger-btn');
// 	navMenu.classList.remove('show-nav-menu');
// };

// const getScrollbarWidth = () => {
// 	return window.innerWidth - document.documentElement.clientWidth;
// };

// const showModal = cardIndex => {
// 	const scrollbarWidth = getScrollbarWidth();
// 	body.style.paddingRight = `${scrollbarWidth}px`;
// 	body.classList.add('no-scroll-modal');
// 	fetch('animals.json')
// 		.then(response => response.json())
// 		.then(animalsData => {
// 			const pets = animalsData;
// 			console.log(pets);
// 			popupImg.src = `./${pets[cardIndex].img}`;
// 			petName.innerHTML = pets[cardIndex].name;
// 			petType.innerHTML = `${pets[cardIndex].type} - ${pets[cardIndex].breed}`;
// 			petDescription.innerHTML = `${pets[cardIndex].description}`;
// 			petAge.innerHTML = `<span>Age:</span>    ${pets[cardIndex].age}`;
// 			petInoculations.innerHTML = `<span>Inoculations:</span>   ${pets[cardIndex].inoculations}`;
// 			petDiseases.innerHTML = `<span>Diseases:</span>   ${pets[cardIndex].diseases}`;
// 			petParasit.innerHTML = `<span>Parasites:</span>   ${pets[cardIndex].parasites}`;

// 			console.log('GET ANIMALSDATA=', animalsData);
// 		})
// 		.catch(error => console.error('Ошибка:', error));

// 	modal.classList.add('show-popup');
// 	shadow.classList.add('show');
// };

// const closeModal = () => {
// 	body.classList.remove('no-scroll-modal');
// 	body.style.paddingRight = '';
// 	modal.classList.remove('show-popup');
// 	shadow.classList.remove('show');
// };

// const checkWindowSize = () => {
// 	if (window.innerWidth < 1000) {
// 		chunkLength = 2;
// 		updateSlider(pets, slideIndex, chunkLength);
// 	} else {
// 		chunkLength = 3;
// 		updateSlider(pets, slideIndex, chunkLength);
// 	}
// 	if (window.innerWidth < 768) {
// 		burgerBtn.classList.add('show-burger-btn');
// 	} else {
// 		burgerBtn.classList.remove('show-burger-btn');
// 		checkPage();
// 	}
// };
// window.addEventListener('load', checkWindowSize);
// window.addEventListener('resize', checkWindowSize);

// function getChunk(_data, _slideIndex, _chunkLength) {
// 	let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);
// 	if (chunk.length < _chunkLength) {
// 		return chunk.concat(_data[0]);
// 	} else return chunk;
// }

// function updateSlider(_data, _slideIndex, _chunkLength) {
// 	if (_slideIndex >= _data.length) {
// 		_slideIndex = 0;
// 		slideIndex = _slideIndex;
// 	} else if (_slideIndex < 0) {
// 		_slideIndex = _data.length - 2;
// 		slideIndex = _slideIndex;
// 	}
// 	slider.innerHTML = '';

// 	getChunk(_data, _slideIndex, _chunkLength).forEach((item, index) => {
// 		slider.style.position = 'relative';
// 		const slide = document.createElement('div');
// 		slide.className = 'slide';
// 		const card = document.createElement('div');
// 		card.className = 'pets-slider__card pets__card';
// 		card.setAttribute('data-index-card', `${_slideIndex + index}`);
// 		const cardImg = document.createElement('img');
// 		cardImg.className = 'pets__card-img';
// 		cardImg.src = `./${item.img}`;
// 		cardImg.alt = `pets-${item.name.toLowerCase()}`;

// 		const cardName = document.createElement('p');
// 		cardName.className = 'pets__card-name';
// 		cardName.innerHTML = item.name;

// 		const cardBtn = document.createElement('button');
// 		cardBtn.className = 'pets__card-btn btn btn-no-bg';
// 		cardBtn.innerHTML = '<span class="btn-text-position">Learn more</span>';

// 		card.append(cardImg);
// 		card.append(cardName);
// 		card.append(cardBtn);

// 		slide.append(card);

// 		slider.append(slide);
// 	});
// 	const btnLeftSlide = document.createElement('div');
// 	const btnRightSlide = document.createElement('div');
// 	const arrowLeft = document.createElement('svg');
// 	const arrowRight = document.createElement('svg');
// 	arrowLeft.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
// 										<path d="M14 2V4H3V6L0 3L3 0V2H14Z" fill="#292929" />
// 									</svg>`;
// 	arrowRight.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
// 										<path d="M0 4V2L11 2V0L14 3L11 6V4L0 4Z" fill="#292929" />
// 									</svg>`;
// 	btnLeftSlide.className = 'pets-slider__btn';
// 	btnLeftSlide.classList.add('btn');
// 	btnLeftSlide.classList.add('btn-no-bg');
// 	btnRightSlide.className = 'pets-slider__btn';
// 	btnRightSlide.classList.add('btn');
// 	btnRightSlide.classList.add('btn-no-bg');

// 	btnLeftSlide.append(arrowLeft);
// 	btnRightSlide.append(arrowRight);

// 	slider.prepend(btnLeftSlide);
// 	slider.append(btnRightSlide);

// 	cardList = document.querySelectorAll('.pets__card');
// 	cardList.forEach(card => {
// 		card.addEventListener('click', () => {
// 			const cardIndex = card.getAttribute('data-index-card');
// 			showModal(cardIndex);
// 		});
// 	});

// 	btnLeftSlide.addEventListener('click', () => {
// 		slideIndex += chunkLength;
// 		slider.style.position = 'absolute';
// 		slider.style.top = '0px';
// 		slider.style.left = '0px';
// 		slider.style.transform = `translateX(-${slideIndex * (slider.offsetWidth / chunkLength)}px)`;
// 		updateSlider(pets, slideIndex, chunkLength);
// 	});
// 	btnRightSlide.addEventListener('click', rightSlide);
// }

// updateSlider(pets, slideIndex, chunkLength);

// // function leftSlide() {
// // 	slideIndex += chunkLength;
// // 	updateSlider(pets, slideIndex, chunkLength);
// // }

// function rightSlide() {
// 	slideIndex -= chunkLength;
// 	updateSlider(pets, slideIndex, chunkLength);
// }

// burgerBtn.addEventListener('click', toggleNavMenu);
// shadow.addEventListener('click', closeNavMenu);
// shadow.addEventListener('click', closeModal);
// linksNavMenu.forEach(link => link.addEventListener('click', closeNavMenu));
// modalCloseBtn.addEventListener('click', closeModal);

