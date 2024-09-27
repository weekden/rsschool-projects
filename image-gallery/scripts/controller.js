export function ImageGaleryController() {
	let myModel = null;
	let myContainer = null;

	// Инициализируем контроллер и связываем модель с которой работаем и контейнер внутри которого будем работать
	this.init = (model, container) => {
		myModel = model;
		myContainer = container;
		// Объявляем обработчики событий для кнопок управления

        const headerLogo = myContainer.querySelector(".logo");
        headerLogo.addEventListener("click", this.getColection)

		const inputSearch = myContainer.querySelector('#input-search');
		inputSearch.addEventListener('keypress', this.hendlerEnterPress);
		inputSearch.addEventListener('input', this.checkInputValue);

		const btnSearch = myContainer.querySelector('#btn-search');
		btnSearch.addEventListener('click', this.getSearchValue);

		const btnEndSearch = myContainer.querySelector('#btn-mark');
		btnEndSearch.addEventListener('click', this.getColection);

        const btnMyFavorite = myContainer.querySelector("#favorite-photo");
        btnMyFavorite.addEventListener("click", this.showColectionFavorite)

		const btnPrevCollection = myContainer.querySelector('#prev');
		btnPrevCollection.addEventListener('click', this.getPrevColection);

		const btnNextColection = myContainer.querySelector('#next');
		btnNextColection.addEventListener('click', this.getNexColection);

		const imgContainer = myContainer.querySelector('.images-wrapper');
		imgContainer.addEventListener('click', event => {
			const clickedElement = event.target.closest('.favorite-icon__container');

			if (clickedElement) {
				const imgID = clickedElement.getAttribute('data-index');
				myModel.setPhotoID(imgID);
			}
		});
	};
	// Назначаем обработчики событий для кнопок
	this.getPrevColection = () => {
		myModel.setPrevColectionNumber();
	};

	this.getNexColection = () => {
		myModel.setNextColectionNumber();
	};

	// this.getFirstaPageNumber = () => {
	//     myModel.setFirstColectionNumber();
	// }

	// this.getLastColectionNumber = () => {
	//     myModel.setLastColectionNumber();
	// }

	this.getSearchValue = () => {
		const inputSearch = myContainer.querySelector('#input-search');
		const quertyWord = inputSearch.value;

		myModel.setQuertyWord(quertyWord);
	};

	this.getColection = () => {
		myModel.resetSearch();
	};

	this.hendlerEnterPress = event => {
		if (event.key === 'Enter') {
			this.getSearchValue();
		}
	};

	this.checkInputValue = () => {
		const inputSearch = myContainer.querySelector('#input-search');
		if (inputSearch.value === '') this.getColection();
	};

    this.showColectionFavorite = () => {
        myModel.showMyColection()
    }

}
