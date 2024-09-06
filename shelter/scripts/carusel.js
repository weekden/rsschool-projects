const slider = document.querySelector('.slider');
const btnLeftSlide = document.querySelector('#slider-left-btn');
const btnRightSlide = document.querySelector('#slider-right-btn');
let pets = null;
let slideIndex = 0;
let chunkLength = 3;
let isAnimate = false;

fetch('../animals.json')
	.then(response => response.json())
	.then(animalsData => {
		pets = animalsData;

		addAtibute(animalsData);
		randomSortPets(animalsData);
		initSlider(animalsData, slideIndex, chunkLength);
	})
	.catch(error => console.error('Ошибка:', error));

function addAtibute(_data) {
	_data.forEach((item, index) => {
		item.atribute = index;
	});
}

function randomSortPets(_data) {
	return _data.sort(() => Math.random() - 0.5);
}

function getChunk(_data, _slideIndex, _chunkLength) {
	let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);

	if (chunk.length < _chunkLength) {
		chunk = chunk.concat(_data.slice(0, _chunkLength - chunk.length));
	}
	return chunk;
}

function createCards(_item) {
	const card = document.createElement('div');
	card.className = 'pets-slider__card pets__card';
	card.setAttribute('data-index-card', `${_item.atribute}`);
	const cardImg = document.createElement('img');
	cardImg.className = 'pets__card-img';
	cardImg.src = `../${_item.img}`;
	cardImg.alt = `pets-${_item.name.toLowerCase()}`;

	const cardName = document.createElement('p');
	cardName.className = 'pets__card-name';
	cardName.innerHTML = _item.name;

	const cardBtn = document.createElement('button');
	cardBtn.className = 'pets__card-btn btn btn-no-bg';
	cardBtn.innerHTML = '<span class="btn-text-position">Learn more</span>';

	card.append(cardImg);
	card.append(cardName);
	card.append(cardBtn);
	return card;
}

function initSlider(_data, _slideIndex, _chunkLength) {
	const slideContainer = document.createElement('div');
	slideContainer.className = 'slide-container';

	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
		slideContainer.append(createCards(item));
	});

	slider.append(slideContainer);
	showModal();
}

function updateSlider(_data, _slideIndex, _chunkLength, direction, resize = false) {
	if (isAnimate && resize) return;
	isAnimate = true;

	const slideContainer = slider.querySelector('.slide-container');

	const newSlideContainer = document.createElement('div');
	newSlideContainer.className = 'slide-container';

	if (!resize) {
		slideContainer.classList.add('slide-animation');
		newSlideContainer.classList.add('slide-animation');
	} else {
		slideContainer.classList.remove('slide-animation');
		newSlideContainer.classList.remove('slide-animation');
	}

	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
		newSlideContainer.append(createCards(item));
	});

	if (direction === 'left') {
		slider.prepend(newSlideContainer);
		newSlideContainer.style.position = 'absolute';
		newSlideContainer.style.transform = `translateX(-100%)`;
	} else if (direction === 'right') {
		slider.append(newSlideContainer);
		slideContainer.style.position = 'absolute';
		newSlideContainer.style.transform = `translateX(100%)`;
	}

	setTimeout(() => {
		slideContainer.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
		newSlideContainer.style.transform = `translateX(0)`;
		showModal();
	}, 0);

	setTimeout(() => {
		deletEventListener();
		newSlideContainer.style.position = 'relative';
		slideContainer.style.position = 'relative';
		slideContainer.style.width = '0 px';
		slideContainer.remove();
		isAnimate = false;
	}, 500);
}

btnLeftSlide.addEventListener('click', () => {
	if (isAnimate) return;

	slideIndex -= chunkLength;

	if (slideIndex < 0) {
		slideIndex = pets.length + slideIndex;
	}
	updateSlider(pets, slideIndex, chunkLength, 'left');
});

btnRightSlide.addEventListener('click', () => {
	if (isAnimate) return;

	slideIndex += chunkLength;

	if (slideIndex >= pets.length) {
		slideIndex = slideIndex % pets.length;
	}
	updateSlider(pets, slideIndex, chunkLength, 'right');
});

const checkWindowSize = () => {
	let newChunkLength = null;

	if (window.innerWidth < 650) {
		newChunkLength = 1;
	} else if (window.innerWidth < 1000) {
		newChunkLength = 2;
	} else {
		newChunkLength = 3;
	}

	if (newChunkLength === chunkLength || isAnimate) return;

	chunkLength = newChunkLength;

	updateSlider(pets, slideIndex, chunkLength, 'right', true);
};

window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);







// const slider = document.querySelector('.slider');
// const btnLeftSlide = document.querySelector('#slider-left-btn');
// const btnRightSlide = document.querySelector('#slider-right-btn');
// let pets = null;
// let slideIndex = 0;
// let chunkLength = 3;
// let isAnimate = false;

// fetch('../animals.json')
// 	.then(response => response.json())
// 	.then(animalsData => {
// 		pets = animalsData;

// 		addAtibute(animalsData);
// 		randomSortPets(animalsData);
// 		initSlider(animalsData, slideIndex, chunkLength);
// 	})
// 	.catch(error => console.error('Ошибка:', error));

// function addAtibute(_data) {
// 	_data.forEach((item, index) => {
// 		item.atribute = index;
// 	});
// }

// function randomSortPets(_data) {
// 	return _data.sort(() => Math.random() - 0.5);
// }

// function getChunk(_data, _slideIndex, _chunkLength) {
// 	let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);

// 	if (chunk.length < _chunkLength) {
// 		chunk = chunk.concat(_data.slice(0, _chunkLength - chunk.length));
// 	}
// 	return chunk;
// }

// function createCards(_item) {
// 	const card = document.createElement('div');
// 	card.className = 'pets-slider__card pets__card';
// 	card.setAttribute('data-index-card', `${_item.atribute}`);
// 	const cardImg = document.createElement('img');
// 	cardImg.className = 'pets__card-img';
// 	cardImg.src = `../${_item.img}`;
// 	cardImg.alt = `pets-${_item.name.toLowerCase()}`;

// 	const cardName = document.createElement('p');
// 	cardName.className = 'pets__card-name';
// 	cardName.innerHTML = _item.name;

// 	const cardBtn = document.createElement('button');
// 	cardBtn.className = 'pets__card-btn btn btn-no-bg';
// 	cardBtn.innerHTML = '<span class="btn-text-position">Learn more</span>';

// 	card.append(cardImg);
// 	card.append(cardName);
// 	card.append(cardBtn);
// 	return card;
// }

// function initSlider(_data, _slideIndex, _chunkLength) {
// 	const slideContainer = document.createElement('div');
// 	slideContainer.className = 'slide-container';

// 	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
// 		slideContainer.append(createCards(item));
// 	});

// 	slider.append(slideContainer);
// 	showModal();
// }

// function updateSlider(_data, _slideIndex, _chunkLength, direction, resize = false) {
// 	if (isAnimate && resize) return;
// 	isAnimate = true;

// 	const slideContainer = slider.querySelector('.slide-container');

// 	const newSlideContainer = document.createElement('div');
// 	newSlideContainer.className = 'slide-container';

// 	if (!resize) {
// 		slideContainer.classList.add('slide-animation');
// 		newSlideContainer.classList.add('slide-animation');
// 	} else {
// 		slideContainer.classList.remove('slide-animation');
// 		newSlideContainer.classList.remove('slide-animation');
// 	}

// 	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
// 		newSlideContainer.append(createCards(item));
// 	});

// 	if (direction === 'left') {
// 		slider.prepend(newSlideContainer);
// 		newSlideContainer.style.position = 'absolute';
// 		newSlideContainer.style.transform = `translateX(-100%)`;
// 	} else if (direction === 'right') {
// 		slider.append(newSlideContainer);
// 		slideContainer.style.position = 'absolute';
// 		newSlideContainer.style.transform = `translateX(100%)`;
// 	}

// 	setTimeout(() => {
// 		slideContainer.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
// 		newSlideContainer.style.transform = `translateX(0)`;
// 		showModal();
// 	}, 0);

// 	setTimeout(() => {
// 		deletEventListener();
// 		newSlideContainer.style.position = 'relative';
// 		slideContainer.style.position = 'relative';
// 		slideContainer.style.width = '0 px';
// 		slideContainer.remove();
// 		isAnimate = false;
// 	}, 500);
// }

// btnLeftSlide.addEventListener('click', () => {
// 	if (isAnimate) return;

// 	slideIndex -= chunkLength;

// 	if (slideIndex < 0) {
// 		slideIndex = pets.length + slideIndex;
// 	}
// 	updateSlider(pets, slideIndex, chunkLength, 'left');
// });

// btnRightSlide.addEventListener('click', () => {
// 	if (isAnimate) return;

// 	slideIndex += chunkLength;

// 	if (slideIndex >= pets.length) {
// 		slideIndex = slideIndex % pets.length;
// 	}
// 	updateSlider(pets, slideIndex, chunkLength, 'right');
// });

// const checkWindowSize = () => {
// 	let newChunkLength = null;

// 	if (window.innerWidth < 650) {
// 		newChunkLength = 1;
// 	} else if (window.innerWidth < 1000) {
// 		newChunkLength = 2;
// 	} else {
// 		newChunkLength = 3;
// 	}

// 	if (newChunkLength === chunkLength || isAnimate) return;

// 	chunkLength = newChunkLength;

// 	updateSlider(pets, slideIndex, chunkLength, 'right', true);
// };

// window.addEventListener('load', checkWindowSize);
// window.addEventListener('resize', checkWindowSize);
