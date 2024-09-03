const paginationContainer = document.querySelector('.pets-cards__container');
const btnDublePrew = document.querySelector('#pets-nav__duble-prew');
const btnPrew = document.querySelector('#pets-nav__single-prew');
const btnNext = document.querySelector('#pets-nav__single-next');
const btnDubleNext = document.querySelector('#pets-nav__duble-next');
const currentPageNumder = document.querySelector('#pets-nav__current-page span');

let slideIndex = 0;
let chunkLength = 8;
let pets = null;
let pagesCounter = 1;
let petsExpanded = [];
let lastElementsPrevPets = null;

fetch('../animals.json')
	.then(response => response.json())
	.then(animalsData => {
		pets = animalsData;
		addAtibute(animalsData);
        pets = pets.sort(() => Math.random() - 0.5);
		createPetsExpandedArray();
        console.log(petsExpanded)
		updateSlider(petsExpanded, slideIndex, chunkLength);
	})
	.catch(error => console.error('Ошибка:', error));

function addAtibute(_data) {
	_data.forEach((item, index) => {
		item.atribute = index;
	});
}

function sortParts() {
    let firstHalf =  pets.slice(0, pets.length / 2).sort(() => Math.random() - 0.5);
    let secondHalf =  pets.slice(-pets.length / 2).sort(() => Math.random() - 0.5);
    return firstHalf.concat(secondHalf)
}

function arraysEqal(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function createPetsExpandedArray() {
	for (let i = 0; i < 6; i++) {
		if (i > 0) {
            let newSortPets = sortParts();
            if(arraysEqal(newSortPets, pets)) {
                sortParts()
             
            }
         
            petsExpanded = petsExpanded.concat(newSortPets)
           continue;
		}

		petsExpanded = petsExpanded.concat(pets);
	}
    
}

function getChunk(_data, _slideIndex, _chunkLength) {
	let chunk = _data.slice(_slideIndex, _slideIndex + _chunkLength);
	return chunk;
}

function checkPageNumber() {
	pagesCounter > 1 ? (btnPrew.disabled = false) : (btnPrew.disabled = true);
	pagesCounter > 1 ? (btnDublePrew.disabled = false) : (btnDublePrew.disabled = true);

	pagesCounter >= petsExpanded.length / chunkLength ? (btnNext.disabled = true) : (btnNext.disabled = false);
	pagesCounter >= petsExpanded.length / chunkLength ? (btnDubleNext.disabled = true) : (btnDubleNext.disabled = false);
}

function updateSlider(_data, _slideIndex, _chunkLength) {
	paginationContainer.innerHTML = '';
	currentPageNumder.innerHTML = pagesCounter;
	checkPageNumber();
	getChunk(_data, _slideIndex, _chunkLength).forEach(item => {
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

    showModal()
}

btnNext.addEventListener('click', () => {
    deletEventListener()
	slideIndex += chunkLength;
	pagesCounter++;
	updateSlider(petsExpanded, slideIndex, chunkLength);
});

btnDubleNext.addEventListener('click', () => {
    deletEventListener()
	slideIndex = petsExpanded.length - chunkLength;
	pagesCounter = petsExpanded.length / chunkLength;
	updateSlider(petsExpanded, slideIndex, chunkLength);
});

btnPrew.addEventListener('click', () => {
    deletEventListener()
	slideIndex -= chunkLength;
	pagesCounter--;
	updateSlider(petsExpanded, slideIndex, chunkLength);
});

btnDublePrew.addEventListener('click', () => {
    deletEventListener()
	slideIndex = 0;
	pagesCounter = 1;
	updateSlider(petsExpanded, slideIndex, chunkLength);
});

const checkWindowSize = () => {
	let newChunkLength = chunkLength;

	if (window.innerWidth < 528) {
		newChunkLength = 3;
	} else if (window.innerWidth < 1000) {
		newChunkLength = 6;
	} else newChunkLength = 8;

    if (newChunkLength !== chunkLength) {
        pagesCounter = Math.ceil((slideIndex + 1) / newChunkLength);
        slideIndex = pagesCounter * newChunkLength - newChunkLength;
   
        chunkLength = newChunkLength;
    }

	updateSlider(petsExpanded, slideIndex, chunkLength);
};

window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);
