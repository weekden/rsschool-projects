export function ImageGaleryController() {
	let myModel = null;
	let myContainer = null;

	// Инициализируем контроллер и связываем модель с которой работаем и контейнер внутри которого будем работать
	this.init = (model, container) => {
		myModel = model;
		myContainer = container;

		// Объявляем обработчики событий для кнопок управления
        // логотип в  хедере
		const headerLogo = myContainer.querySelector('.logo');
		headerLogo.addEventListener('click', this.getColection);
        // поле поиска
		const inputSearch = myContainer.querySelector('#input-search');
		inputSearch.addEventListener('keypress', this.hendlerEnterPress);
		inputSearch.addEventListener('input', this.checkInputValue);
        // иконка поиска
		const btnSearch = myContainer.querySelector('#btn-search');
		btnSearch.addEventListener('click', this.getSearchValue);
        // иконка понец поиска (matrk)
		const btnEndSearch = myContainer.querySelector('#btn-mark');
		btnEndSearch.addEventListener('click', this.getColection);
        // кнопка favorite в хедере
		const btnMyFavorite = myContainer.querySelector('#favorite-photo');
		btnMyFavorite.addEventListener('click', this.showColectionFavorite);
        // предыдущий набор из коллекций
		const btnPrevCollection = myContainer.querySelector('#prev');
		btnPrevCollection.addEventListener('click', this.getPrevColection);
        // следующий набор из коллекций
		const btnNextColection = myContainer.querySelector('#next');
		btnNextColection.addEventListener('click', this.getNexColection);
        // иконка закрытия попапа
		const btnClosePopup = myContainer.querySelector('#popup-mark');
		btnClosePopup.addEventListener('click', this.getPopupState);

        // вешаем обработчик событий на контейнере-родителе использую дилигирование
		const imgContainer = myContainer.querySelector('.images-wrapper');
        
		imgContainer.addEventListener('click', event => {
			const clickedIcon = event.target.closest('.favorite-icon__container');
			const clickedImg = event.target.closest('.img-container');
            // проверяем по какому именно элементу был клик
			let imgID;
            // клик по иконке получаем раннее сетнутый атрибут в виде ID картинки записываем вызываем в модели функцию добавления в массив favorite
			if (clickedIcon) {
				imgID = clickedIcon.getAttribute('data-index');
				myModel.setPhotoID(imgID);
				myModel.addPhotoToFavorite();
                // клик по rfhnbyrt получаем раннее сетнутый атрибут в виде ID картинки записываем вызываем в модели функцию для получения id и в дальнейшем рендеры попапа
			} else if (clickedImg) {
				imgID = clickedImg.getAttribute('data-index');
				myModel.setPhotoID(imgID);
				myModel.getPhotoForRender();
			}
		});
	};

	// Назначаем обработчики событий для кнопок
    // вызов в модели функции уменьшении индека 
	this.getPrevColection = () => {
		myModel.setPrevColectionNumber();
	};
    // вызов в модели функции увеличении индекса
	this.getNexColection = () => {
		myModel.setNextColectionNumber();
	};
    // снимаем значение с инпута поиска и передаем это значение в модель
	this.getSearchValue = () => {
		const inputSearch = myContainer.querySelector('#input-search');
		const quertyWord = inputSearch.value;
     
		myModel.setQuertyWord(quertyWord);
	};
    // вызов функции сброса поиска
	this.getColection = () => {
		myModel.resetSearch();
	};
    // по нажатию Enter снимаем значение с инпута поиска и передаем это значение в модель 
	this.hendlerEnterPress = event => {
		if (event.key === 'Enter') {
			this.getSearchValue();
		}
	};

    // при пустом инпуте вызов отображения коллекции отслеживается с события input
	this.checkInputValue = () => {
		const inputSearch = myContainer.querySelector('#input-search');
		if (inputSearch.value === '') this.getColection();
	};
    // вызов показа коллекции favorite
	this.showColectionFavorite = () => {
		myModel.showMyColection();
	};
    // передача состояния попапа
	this.getPopupState = () => {
		myModel.setPopupState();
	};
}
