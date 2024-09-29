export function ImageGaleryModel() {
	const APIKEY = 'YGpA_nVYwXCpsdf69TdkUOVpuDVAoD7RBzANUxK0AHQ';
	let myView = null;
	let currentColectionIndex = 1;
	let coinImageAtPage = 24;   // количество фото при запросе
	let dataPhotos = null;      // массив получаемых коллекций
	let photoID = null;         // ID photo
	let favoritePhotoArray = [];    // массив для хранения favorite foto
	let quertyWord = '';            // слово для поиска
	let urlSearch = '';             // параметр для поиска

	// Инициализируем модель и связываем ее с view. При инициализации получаем ширину окна, запрос на получение данных из LS делаем запрос на получение foto
	this.init = view => {
		myView = view;
		this.getWindowWidth(window.innerWidth);
		this.getArrPhotoFromLS();
		this.fetchPhotos();
	};
	// Запрос для коллекций фото
    // запрос реализован динамически в зависимости от того что требуется отобразить при запросе просто коллекция или колллекция по поиску
	this.fetchPhotos = async function () {
		const url = `https://api.unsplash.com/${urlSearch}photos?page=${currentColectionIndex}${quertyWord}&per_page=${coinImageAtPage}&client_id=${APIKEY}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
            // если response имеет ключ ok
			if (response.ok) {
                // проверка какой был запрос по слову или нет и записываем в  массив получаемых коллекций
				if (quertyWord) {
					dataPhotos = data.results;
				} else {
					dataPhotos = data;
				}
                // вызов передачи значений для пагинации
				this.setPaginationOgj(data);
                // вызов рендера во вью с передачей необходимого массива для отрисовка и флага
				myView.renderPhotos(dataPhotos, 'feth');
                // вызов в рендера во вью для отрисовки строки поиска
				myView.renderStateInputSearch(urlSearch);
			}
		} catch (error) {
			console.error('Ошибка в получении фото', error);
		}
	};
	// запрос для получения фото по ID
	this.fethPhotoByID = async function (photoID, flag) {
		const url = `https://api.unsplash.com/photos/${photoID}?client_id=${APIKEY}`;
		try {
			const response = await fetch(url);
			const favoritePhoto = await response.json();
			if (response.ok) {
                // добавляем фото в favorite
				if (flag === 'addFavotite') {
					this.setPhotoToLS(favoritePhoto);
				}
                // рендер попапа
				if (flag === 'popupRender') {
					myView.renderPupup(favoritePhoto);
				}
			}
		} catch (error) {
			console.error('Ошибка в получении фото', error);
		}
	};
    // увеличение индекса страницы
	this.setPrevColectionNumber = () => {
		currentColectionIndex--;
		this.fetchPhotos();
	};
      // уменьшение индекса страницы
	this.setNextColectionNumber = () => {
		currentColectionIndex++;
		this.fetchPhotos();
	};
    // получаем слово из строки поиска и сбрасываем текущий индекс 
	this.setQuertyWord = query => {
		urlSearch = 'search/';
		quertyWord = `&query=${query}`;
		currentColectionIndex = 1;
		this.fetchPhotos();
	};
    // сброс строки поиска
	this.resetSearch = () => {
		currentColectionIndex = 1;
		urlSearch = '';
		quertyWord = '';
		this.fetchPhotos();
	};
    // формировка объекта для пагинации
	this.setPaginationOgj = data => {
		const paginationObj = {
			pageNumber: currentColectionIndex,
			coinPages: Math.floor(data.total / coinImageAtPage),
		};
		myView.renderPagination(paginationObj);
	};
    // получение и запись id photo
	this.setPhotoID = id => {
		photoID = id;
	};
    // вызов закрытия попапа
    this.setPopupState = () => {
        myView.closePopup()
    }
    //  вызов запроса добавление в favotite
	this.addPhotoToFavorite = () => {
		this.fethPhotoByID(photoID, 'addFavotite');
	};
    // вызов запроса для попапа
	this.getPhotoForRender = () => {
		this.fethPhotoByID(photoID, 'popupRender');
	};
    // ф-я добавления фото в LS
	this.setPhotoToLS = favoritePhoto => {
        // вызов на получение данных из LS
		this.getArrPhotoFromLS();
        // проверяем LS на наличее фото с id таким же каким хотим добавить
		for (let i = 0; i < favoritePhotoArray.length; i++) {
			if (favoritePhotoArray[i].id === favoritePhoto.id) {
                // выходим если есть совпадения
				return;
			}
		}
        // пушим выбранное в массив favorite
		favoritePhotoArray.push(favoritePhoto);
        // преобразовываем в строку
		let jsonString = JSON.stringify(favoritePhotoArray);
        // добавляем в LS
		localStorage.setItem('myFavoritePhoto', jsonString);
	};
    // ф-я получения фото из LS
	this.getArrPhotoFromLS = () => {
        // парсим обратно в масссив
		let favoritePhotos = JSON.parse(localStorage.getItem('myFavoritePhoto'));
        // выходим если LS пуст
		if (!favoritePhotos) return; 
        // перезаписываем массив favorite
		favoritePhotoArray = favoritePhotos.slice();
		return favoritePhotoArray;
	};

    // ф-я отрисовки коллекции favorite
	this.showMyColection = () => {
		myView.renderPhotos(favoritePhotoArray, 'ls');
	};
    // ф-я проверки ширины экрана изменяет количество фото на запрос при загрузке на разных широтах
	this.getWindowWidth = width => {
		if (width < 450) {
			coinImageAtPage = 8;
		} else if (width <= 768) {
			coinImageAtPage = 12;
		} else {
			coinImageAtPage = 24;
		}
	};
}
