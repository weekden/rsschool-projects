const modalPopup = document.querySelector('.popup-wrapper .popup');
const popupImg = document.querySelector('.popup img');
const petName = document.querySelector('.popup-title');
const petType = document.querySelector('.popup-subtitle');
const petDescription = document.querySelector('.popup-description');
const petAge = document.querySelector('.popup-age');
const petInoculations = document.querySelector('.popup-inoculations');
const petDiseases = document.querySelector('.popup-diseases');
const petParasit = document.querySelector('.popup-parasites');

fetch('animals.json')
	.then(response => response.json())
	.then(animalsData => {
		const pets = animalsData;
		popupImg.src = `./${pets[0].img}`;
		petName.innerHTML = pets[0].name;
		petType.innerHTML = `${pets[0].type} - ${pets[0].breed}`;
		petDescription.innerHTML = `${pets[0].description}`;
		petAge.innerHTML = `<span style="font-weight: 700;">Age:</span>  ${pets[0].age}`;
		petInoculations.innerHTML = `<span style="font-weight: 700;">Inoculations:</span> ${pets[0].inoculations}`;
		petDiseases.innerHTML = `<span style="font-weight: 700;">Diseases:</span> ${pets[0].diseases}`;
		petParasit.innerHTML = `<span style="font-weight: 700;">Parasites:</span>  ${pets[0].parasites}`;

		console.log('GET ANIMALSDATA=', animalsData);
	})
	.catch(error => console.error('Ошибка:', error));

// const petName = document.querySelector('.popup-title');
// const petType = document.querySelector('.popup-subtitle');
// const petDescription = document.querySelector('.poup-description');
// const petAge = document.querySelector('.popup-age');
