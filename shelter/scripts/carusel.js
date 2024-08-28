
const slider = document.querySelector('.pets-slider');
let pets = null;
let slideIndex = 0;
let chunkLength = 3;
let prevIndex = null;
let prevChunk = null;

document.addEventListener('DOMContentLoaded', () => {
	fetch('animals.json')
		.then(response => response.json())
		.then(animalsData => {
			 pets = animalsData;

			addAtibute(animalsData);
			randomSortPets(animalsData);
			updateSlider(animalsData, slideIndex, chunkLength);
		})
		.catch(error => console.error('Ошибка:', error));
});



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

function updateSlider(_data, _slideIndex, _chunkLength) {
	slider.innerHTML = '';
	const slideContainer = document.createElement('div');
	slideContainer.className = 'slide-container';

	// let currentChunk = _slideIndex === prevIndex ? prevChunk : getChunk(_data, _slideIndex, _chunkLength);

	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
		const card = document.createElement('div');
		card.className = 'pets-slider__card pets__card';
		card.setAttribute('data-index-card', `${item.atribute}`);
		const cardImg = document.createElement('img');
		cardImg.className = 'pets__card-img';
		cardImg.src = `./${item.img}`;
		cardImg.alt = `pets-${item.name.toLowerCase()}`;

		const cardName = document.createElement('p');
		cardName.className = 'pets__card-name';
		cardName.innerHTML = item.name;

		const cardBtn = document.createElement('button');
		cardBtn.className = 'pets__card-btn btn btn-no-bg';
		cardBtn.innerHTML = '<span class="btn-text-position">Learn more</span>';

		card.append(cardImg);
		card.append(cardName);
		card.append(cardBtn);

		slideContainer.append(card);
	});

	// prevChunk = currentChunk;

	// prevIndex = _slideIndex;
	// randomSortPets(_data);
	const btnLeftSlide = document.createElement('div');
	btnLeftSlide.className = 'pets-slider__btn';
	btnLeftSlide.id = 'slider-left-btn';
	btnLeftSlide.classList.add('btn');
	btnLeftSlide.classList.add('btn-no-bg');

	const btnRightSlide = document.createElement('div');
	btnRightSlide.className = 'pets-slider__btn';
	btnRightSlide.id = 'slider-right-btn';
	btnRightSlide.classList.add('btn');
	btnRightSlide.classList.add('btn-no-bg');

	const arrowLeft = document.createElement('svg');
	const arrowRight = document.createElement('svg');
	arrowLeft.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2V4H3V6L0 3L3 0V2H14Z" fill="#292929" />
                        </svg>`;
	arrowRight.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 4V2L11 2V0L14 3L11 6V4L0 4Z" fill="#292929" />
                        </svg>`;

	btnLeftSlide.append(arrowLeft);
	btnRightSlide.append(arrowRight);

	slider.append(btnLeftSlide);
	slider.append(slideContainer);
	slider.append(btnRightSlide);

	cardList = document.querySelectorAll('.pets__card');
	cardList.forEach(card => {
		card.addEventListener('click', () => {
			const cardIndex = card.getAttribute('data-index-card');
			showModal(cardIndex, 'animals.json', '');
		});
	});

	btnLeftSlide.addEventListener('click', () => {
		slideIndex -= chunkLength;

		if (slideIndex < 0) {
			slideIndex = pets.length + slideIndex;
		}

		updateSlider(pets, slideIndex, chunkLength);
		// if (slideIndex === prevIndex) {
		//     updateSlider(pets, prevIndex, chunkLength);

		// } else {
		//     slideContainer.style.transform = `translateX(-${slideContainer.offsetWidth + btnLeftSlide.offsetWidth}px)`;
		//     setTimeout(() => {
		//         slideContainer.style.transform = `translateX(0)`;

		//         updateSlider(pets, slideIndex, chunkLength);

		//     }, 300);
		// }
	});

	btnRightSlide.addEventListener('click', () => {
		slideIndex += chunkLength;
		if (slideIndex >= pets.length) {
			slideIndex = slideIndex % pets.length;
		}
		updateSlider(pets, slideIndex, chunkLength);
		// if (slideIndex === prevIndex) {
		//     updateSlider(pets, prevIndex, chunkLength);

		// } else {
		//     slideContainer.style.transform = `translateX(${slideContainer.offsetWidth + btnLeftSlide.offsetWidth}px)`;
		//     setTimeout(() => {
		//         slideContainer.style.transform = `translateX(0)`;

		//         updateSlider(pets, slideIndex, chunkLength);

		//     }, 300);
		// }
	});
}

const checkWindowSize = () => {
	let newChunkLength = null;

	if (window.innerWidth < 650) {
		newChunkLength = 1;
	} else if (window.innerWidth < 1000) {
		newChunkLength = 2;
	} else {
		newChunkLength = 3;
	}

	if (newChunkLength === chunkLength) return;

	chunkLength = newChunkLength;
	updateSlider(pets, slideIndex, chunkLength);
};

window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);