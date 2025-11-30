export function ImageGaleryView() {
	let myContainer = null;
	// Инициализируем view и связываем ее с контейнером для работы.
	this.init = container => {
		myContainer = container;
	};
    // отрисовка коллекций фото
	this.renderPhotos = (dataPhotos, type) => {
		const controlsElements = myContainer.querySelector('.control-wrapper');
		const photosContainer = myContainer.querySelector('.images-wrapper');
        const favoritePhotosBtn = myContainer.querySelector(".favorite-container")
		photosContainer.innerHTML = '';
		dataPhotos.forEach(elem => {
			const imgContainer = document.createElement('div');
			const img = document.createElement('img');
			const favoriteIconContainer = document.createElement('div');
			favoriteIconContainer.classList.add('favorite-icon__container');
			imgContainer.classList.add('img-container');
			favoriteIconContainer.innerHTML = `<svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" higth="30"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
			favoriteIconContainer.setAttribute('data-index', elem.id);
			imgContainer.setAttribute('data-index', elem.id);
			img.alt = elem.alt_description;
			img.src = elem.urls.small;
			imgContainer.append(img, favoriteIconContainer);
			photosContainer.append(imgContainer);

            if (type === 'ls') {
                favoriteIconContainer.classList.add("hide")
            } else {
                favoriteIconContainer.classList.remove("hide")  
            }
		});
        // вывод сообщения если favoritecollection пуста
		if (dataPhotos.length === 0) {
			const messageNotLS = document.createElement('p');
			messageNotLS.classList.add('notls-text');
			messageNotLS.textContent = 'Your collection is emty';
			photosContainer.append(messageNotLS);
		}
        // изменение внешнего вида кнопки favoritePhotosBtn
		if (type === 'ls') {
            favoritePhotosBtn.classList.add("active")
			controlsElements.classList.add('hide');

		} else {
			controlsElements.classList.remove('hide');
            favoritePhotosBtn.classList.remove("active")
		}
	};

    // отрисовка попапа 
	this.renderPupup = photo => {
        if(!photo) return
        const popup = myContainer.querySelector(".popup")
		const popupPhotoContainer = myContainer.querySelector('.popup-img__container');
        const documentBody = document.querySelector("body")

       
		popupPhotoContainer.innerHTML = '';
		const singleImg = document.createElement('img');
		singleImg.alt = photo.alt_description;
		singleImg.src = photo.urls.regular;
		popupPhotoContainer.append(singleImg);
        // убираем скролл
        documentBody.classList.add("no-scroll")
        // показываем попап
        popup.classList.remove("hide")
	};

    // отрисовка  при закрытии попапа 
    this.closePopup = () => {
        const documentBody = document.querySelector("body")
        const popup = myContainer.querySelector(".popup")

        // добавляем скролл скрываем попап
        popup.classList.add("hide")
        documentBody.classList.remove("no-scroll")
    }

    // отрисовка состоянием инпута поиска
	this.renderStateInputSearch = flag => {
		const inputSearch = myContainer.querySelector('#input-search');
		const iconSearch = myContainer.querySelector('#btn-search');
		const iconMark = myContainer.querySelector('#btn-mark');
        // скрываем иконку поиска показываекм иконку закрытия поиска
		if (flag) {
			iconSearch.classList.add('hide');
			iconMark.classList.remove('hide');
         // показываем иконку поиска скрываем иконку закрытия поиска и сбрасываем знычение инпута
		} else {
			iconSearch.classList.remove('hide');
			iconMark.classList.add('hide');
			inputSearch.value = '';
		}
	};

    // отрисовка пагинации
	this.renderPagination = paginationData => {
		if (!paginationData) return;
		const currentPageElem = myContainer.querySelector('#current-page');
		const totalPages = myContainer.querySelector('#total-page');
        const prevPageBtn = myContainer.querySelector("#prev")
		currentPageElem.textContent = '';
		totalPages.textContent = '';
        // при отрисовке случайных фото нет такого ключа как coinPages поэтому общее кол-во стпаниц отображается только прои поиске коллекций
		if (paginationData.coinPages) {
			currentPageElem.textContent = `${paginationData.pageNumber}`;
			totalPages.classList.remove('hide');
			totalPages.textContent = `...${paginationData.coinPages}`;
		} else {
			currentPageElem.textContent = `${paginationData.pageNumber}`;
			totalPages.classList.add('hide');
		}
        // скрываем кнопку показа предыдущих коллекция если это первая страница
        if(paginationData.pageNumber === 1) {
            prevPageBtn.classList.add("hidden")
        } else {
            prevPageBtn.classList.remove("hidden")
        }
	};
}
