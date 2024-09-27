export function ImageGaleryModel() {
	const APIKEY = 'YGpA_nVYwXCpsdf69TdkUOVpuDVAoD7RBzANUxK0AHQ';
	let myView = null;
	let currentColectionIndex = 1;
	let coinImageAtPage = 16;
	let dataPhotos = null;
	let photoID = null;
    let favoritePhotoArray = [];
	let quertyWord = '';
	let urlSearch = '';

	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение foto
	this.init = view => {
		myView = view;
        this.getArrPhotoFromLS();
		this.fetchPhotos();
	};
	// Запрос для коллекций фото
	this.fetchPhotos = async function () {
		const url = `https://api.unsplash.com/${urlSearch}photos?page=${currentColectionIndex}${quertyWord}&per_page=${coinImageAtPage}&client_id=${APIKEY}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				if (quertyWord) {
					dataPhotos = data.results;
				} else {
					dataPhotos = data;
				}
				this.setPaginationOgj(data);
				myView.renderPhotos(dataPhotos, "feth");
				myView.checkStateInputSearch(urlSearch);
			}
		} catch (error) {
			console.error('Ошибка в получении фото', error);
		}
	};
	// запрос для получения фото по ID
	this.fethPhotoByID = async function (photoID) {
		const url = `https://api.unsplash.com/photos/${photoID}?client_id=${APIKEY}`;
		try {
			const response = await fetch(url);
			const favoritePhoto = await response.json();
			if (response.ok) {
				console.log(favoritePhoto);
				this.setPhotoToLS(favoritePhoto);
			}
		} catch (error) {
			console.error('Ошибка в получении фото', error);
		}
	};

	this.setPrevColectionNumber = () => {
		currentColectionIndex--;
		this.fetchPhotos();
	};

	this.setNextColectionNumber = () => {
		currentColectionIndex++;
		this.fetchPhotos();
	};

	this.setQuertyWord = query => {
		urlSearch = 'search/';
		quertyWord = `&query=${query}`;
		currentColectionIndex = 1;
		this.fetchPhotos();
	};

	this.resetSearch = () => {
		currentColectionIndex = 1;
		urlSearch = '';
		quertyWord = '';
		this.fetchPhotos();
	};

	this.setPaginationOgj = data => {
		const paginationObj = {
			pageNumber: currentColectionIndex,
			coinPages: Math.floor(data.total / coinImageAtPage),
		};
		myView.renderPagination(paginationObj);
	};

	this.setPhotoID = id => {
		photoID = id;
		this.fethPhotoByID(id);
	};
    
	this.setPhotoToLS = favoritePhoto => {
        this.getArrPhotoFromLS()
        if(!favoritePhotoArray) return
        for (let i = 0; i < favoritePhotoArray.length; i++) {
            if (favoritePhotoArray[i].id === favoritePhoto.id) {
                return;  
            }
        }
		favoritePhotoArray.push(favoritePhoto);
		let jsonString = JSON.stringify(favoritePhotoArray);
		localStorage.setItem('myFavoritePhoto', jsonString);
	};

	this.getArrPhotoFromLS = () => {
		let favoritePhotos = JSON.parse(localStorage.getItem('myFavoritePhoto'));
        if(!favoritePhotos) return
        favoritePhotoArray = favoritePhotos.slice();
         return favoritePhotoArray
	};

    this.showMyColection = () => {
        myView.renderPhotos(favoritePhotoArray, "ls")
    }

	
}
