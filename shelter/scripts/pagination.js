document.addEventListener('DOMContentLoaded', () => {
	fetch('../animals.json')
		.then(response => response.json())
		.then(animalsData => {
			const pets = animalsData;
			const paginationContainer = document.querySelector('.pets-cards__container');
            const btnDublePrew = document.querySelector("#pets-nav__duble-prew")
            const btnPrew = document.querySelector("#pets-nav__single-prew")
            const btnNext = document.querySelector("#pets-nav__single-next")
            const btnDubleNext = document.querySelector("#pets-nav__duble-next")
            const currentPageNumder = document.querySelector("#pets-nav__current-page span")
            let currentPageNumderValue = 1;
			let petsExpanded = [];

            function addAtibute(_data) {
				_data.forEach((item, index) => {
					item.atribute = index;
				});
			}
			addAtibute(pets);

			for (let i = 0; i < 6; i++) {
				petsExpanded = petsExpanded.concat(pets);
			}

            

			let slideIndex = 0;
			let chunkLength = 8;

			function getChunk(_data, _slideIndex, _chunkLength) {
				let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);
				if (chunk.length < _chunkLength) {
					chunk = chunk.concat(_data[0]);
					return chunk.sort(() => Math.random() - 0.5);
				} else return chunk.sort(() => Math.random() - 0.5);
			}

			console.log(petsExpanded);
			updateSlider(petsExpanded, slideIndex, chunkLength);

            function updateSlider(_data, _slideIndex, _chunkLength) {
                
				if (_slideIndex >= _data.length) {
					_slideIndex = 0;
					slideIndex = _slideIndex;
				} else if (_slideIndex < 0) {
					_slideIndex = _data.length - _chunkLength;
					slideIndex = _slideIndex;
				}
				paginationContainer.innerHTML = '';
                currentPageNumder.innerHTML = currentPageNumderValue
				getChunk(_data, _slideIndex, _chunkLength).forEach((item, index) => {
					const card = document.createElement('div');
					card.className = 'pets-slider__card pets__card';
					card.setAttribute('data-index-card', `${item.atribute}`);
					const cardImg = document.createElement('img');
					cardImg.className = 'pets__card-img';
					cardImg.src = `../${item.img}`;
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

					paginationContainer.append(card);
				});

                
            	cardList = document.querySelectorAll('.pets__card');
				cardList.forEach(card => {
					card.addEventListener('click', () => {
						const cardIndex = card.getAttribute('data-index-card');
						showModal(cardIndex, '../animals.json', "../");
					});
				});
            }

            btnNext.addEventListener('click', () => {
                slideIndex -= chunkLength;
                currentPageNumderValue++
                updateSlider(petsExpanded, slideIndex, chunkLength);
            })

            btnPrew.addEventListener('click', () => {
                slideIndex += chunkLength;
                currentPageNumderValue--
                updateSlider(petsExpanded, slideIndex, chunkLength);
            })
			// const pets = animalsData;

			// const slider = document.querySelector('.pets-slider');

			// let slideIndex = 0;
			// let chunkLength = 3;

			// function addAtibute(_data) {
			// 	_data.forEach((item, index) => {
			// 		item.atribute = index;
			// 	});
			// }
			// addAtibute(pets);
			// updateSlider(pets, slideIndex, chunkLength);

			// function getChunk(_data, _slideIndex, _chunkLength) {
			// 	let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);
			// 	if (chunk.length < _chunkLength) {
			// 		 chunk = chunk.concat(_data[0]);
			//          return chunk.sort(() => Math.random() - 0.5)
			// 	} else return chunk.sort(() => Math.random() - 0.5)
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
			// 	const slideContainer = document.createElement('div');
			// 	slideContainer.className = 'slide-container';
			// 	slideContainer.style.position = 'relative';
			// 	getChunk(_data, _slideIndex, _chunkLength).forEach((item, index) => {
			// 		const card = document.createElement('div');
			// 		card.className = 'pets-slider__card pets__card';
			// 		card.setAttribute('data-index-card', `${item.atribute}`);
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

			// 		slideContainer.append(card);
			// 	});

			// 	const btnLeftSlide = document.createElement('div');
			// 	btnLeftSlide.className = 'pets-slider__btn';
			// 	btnLeftSlide.id = 'slider-left-btn';
			// 	btnLeftSlide.classList.add('btn');
			// 	btnLeftSlide.classList.add('btn-no-bg');

			// 	const btnRightSlide = document.createElement('div');
			// 	btnRightSlide.className = 'pets-slider__btn';
			// 	btnRightSlide.id = 'slider-right-btn';
			// 	btnRightSlide.classList.add('btn');
			// 	btnRightSlide.classList.add('btn-no-bg');

			// 	const arrowLeft = document.createElement('svg');
			// 	const arrowRight = document.createElement('svg');
			// 	arrowLeft.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			// 							<path d="M14 2V4H3V6L0 3L3 0V2H14Z" fill="#292929" />
			// 						</svg>`;
			// 	arrowRight.innerHTML = `<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			// 							<path d="M0 4V2L11 2V0L14 3L11 6V4L0 4Z" fill="#292929" />
			// 						</svg>`;

			// 	btnLeftSlide.append(arrowLeft);
			// 	btnRightSlide.append(arrowRight);

			// 	slider.append(btnLeftSlide);
			// 	slider.append(slideContainer);
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
			// 		slideContainer.style.transform = `translateX(-${slideContainer.offsetWidth + btnLeftSlide.offsetWidth}px)`;
			// 		setTimeout(() => {
			// 			slideContainer.style.transform = `translateX(0)`;
			// 			updateSlider(pets, slideIndex, chunkLength);
			// 		}, 300);
			// 	});
			// 	btnRightSlide.addEventListener('click', () => {
			// 		slideIndex -= chunkLength;
			// 		slideContainer.style.transform = `translateX(${slideContainer.offsetWidth + btnLeftSlide.offsetWidth}px)`;
			// 		setTimeout(() => {
			// 			slideContainer.style.transform = `translateX(0)`;
			// 			updateSlider(pets, slideIndex, chunkLength);
			// 		}, 300);
			// 	});
			// }

			// const checkWindowSize = () => {
			// 	if (window.innerWidth < 1000) {
			// 		chunkLength = 2;
			// 		updateSlider(pets, slideIndex, chunkLength);
			// 	} else {
			// 		chunkLength = 3;
			// 		updateSlider(pets, slideIndex, chunkLength);
			// 	}
			// 	if (window.innerWidth < 650) {
			// 		chunkLength = 1;
			// 		updateSlider(pets, slideIndex, chunkLength);
			// 	} else if (window.innerWidth > 650 && window.innerWidth < 1000) {
			// 		chunkLength = 2;
			// 		updateSlider(pets, slideIndex, chunkLength);
			// 	}
			// };

			// window.addEventListener('load', checkWindowSize);
			// window.addEventListener('resize', checkWindowSize);
		})
		.catch(error => console.error('Ошибка:', error));
});
