export function ImageGaleryView() {
	let myContainer = null;
	// Инициализируем view и связываем ее с контейнером для работы.
	this.init = container => {
		myContainer = container;
	};

	this.renderPhotos = (dataPhotos, type) => {
        const controlsElements = myContainer.querySelector(".control-wrapper")
        if(type === "ls") {
            controlsElements.classList.add("hide")
        } else {
            controlsElements.classList.remove("hide")  
        }
		const photosContainer = myContainer.querySelector('.images-wrapper');
		photosContainer.innerHTML = '';
        console.log(dataPhotos)
		dataPhotos.forEach(elem => {
            const imgContainer = document.createElement("div")
			const img = document.createElement('img');
            const favoriteIconContainer = document.createElement("div")

            favoriteIconContainer.classList.add("favorite-icon__container")
            imgContainer.classList.add("img-container")
            favoriteIconContainer.innerHTML = `<svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" higth="30"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
            favoriteIconContainer.setAttribute("data-index", elem.id);
            imgContainer.setAttribute("data-index", elem.id);
			img.alt = elem.alt_description;
			img.src = elem.urls.small;
			imgContainer.append(img, favoriteIconContainer);
            photosContainer.append(imgContainer)
		});
	}; 

    this.renderSinglePhoto = (photo) => {
        console.log(photo)
        const popupPhotoContainer = myContainer.querySelector('#popup');
        popupPhotoContainer.innerHTML = "";
        const singleImg = document.createElement("img")
        singleImg.alt = photo.alt_description
        singleImg.src = photo.urls.full

        popupPhotoContainer.append(singleImg)
    }

	this.checkStateInputSearch = flag => {
		const inputSearch = myContainer.querySelector('#input-search');
		const iconSearch = myContainer.querySelector('#btn-search');
		const iconMark = myContainer.querySelector('#btn-mark');
		console.log(inputSearch.value);
		if (flag) {
			iconSearch.classList.add('hide');
			iconMark.classList.remove('hide');
		} else {
			iconSearch.classList.remove('hide');
			iconMark.classList.add('hide');
			inputSearch.value = '';
		}
	};

	this.renderPagination = paginationData => {
        if(!paginationData) return
		const currentPageElem = myContainer.querySelector('#current-page');
		const totalPages = myContainer.querySelector('#total-page');
		currentPageElem.textContent = '';
		totalPages.textContent = '';
		if (paginationData.coinPages) {
			currentPageElem.textContent = `${paginationData.pageNumber}`;
            totalPages.classList.remove("hide")
			totalPages.textContent = `...${paginationData.coinPages}`;

		} else {
			currentPageElem.textContent = `${paginationData.pageNumber}`;
            totalPages.classList.add("hide")
		}
	};
}
