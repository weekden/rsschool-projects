

const caruselCards = document.querySelectorAll('.pets-slider__card');
const btnLeft = document.querySelector('#pets-slider__btn-left');
const btnRight = document.querySelector('#pets-slider__btn-right');

fetch('animals.json')
    .then(response => response.json())
    .then(animals => {
        const animalData = animals
        function loadCards() {
            caruselCards.forEach((card, index) => {
                const cardImg = card.querySelector('.pets__card-img');
                const cardName = card.querySelector('.pets__card-name');
                cardImg.src = `./${animalData[index].img}`;
                cardName.innerHTML = animalData[index].name;
            });
        }
        loadCards();
    
    })
    .catch(error => console.error('Ошибка:', error));
// let slideIndex = 0;
// let chunkLength = 3;
// let newArr = [];
// let chunk = [];
// let caruselCardsArr = [];

// for (let i = 0; i < caruselCards.length; i++) {
// 	caruselCardsArr[i] = caruselCards[i];
// }

// console.log(caruselCardsArr);

// function createChunk() {
// 	for (let i = 0; i < caruselCardsArr.length; i += chunkLength) {
// 		chunk = caruselCardsArr.slice(i, i + chunkLength);
// 		if (chunk.length < chunkLength) {
// 			const remainingLength = chunkLength - chunk.length;
// 			chunk = chunk.concat(caruselCardsArr.slice(0, remainingLength));
// 		}

// 		newArr.push(chunk);
// 	}
// }
// createChunk(console.log(newArr));

// function loadCards() {
// 	caruselCards.forEach((card, index) => {
// 		const cardImg = card.querySelector('.pets__card-img');
// 		const cardName = card.querySelector('.pets__card-name');
// 		cardImg.src = `./${animalDataArr[index].img}`;
// 		cardName.innerHTML = animalDataArr[index].name;
// 	});
// }
// loadCards();

// let slideIndex = 0;

// function loadCards() {

// 	caruselCards.forEach((card, index) => {

// 		const cardImg = card.querySelector('.pets__card-img');
// 		const cardName = card.querySelector('.pets__card-name');
// 		cardImg.src = `./${animalDataArr[index].img}`;
// 		cardName.innerHTML = animalDataArr[index].name;

//             let cardWidth = caruselCards[0].offsetWidth
//             if (index >= 3) {
//                 card.style.position = 'absolute';
//                 card.style.right = `${-cardWidth}px`;
//             } else {
//                 card.style.position = 'relative';
//                 card.style.right = '0px';
//             }

// 	});

// }

// loadCards();
// function showSlide() {
// 	if (slideIndex >= caruselCards.length) {
// 		slideIndex = 0;
// 	}

// 	for (let i = 0; i < 3; i++) {
// 		let currentIndex = (slideIndex + i) % caruselCards.length;
// 		caruselCards[currentIndex].style.position = 'relative';
// 	    caruselCards[currentIndex].style.right = '0px';
// 	}
// }

// function slideLeft() {
// 	slideIndex = (slideIndex + 3) % caruselCards.length;
// 	showSlide();
// }

// function slideRight() {
// 	slideIndex = slideIndex - 3;
// 	showSlide();
// }

// btnLeft.addEventListener('click', slideLeft);
// btnRight.addEventListener('click', slideRight);
