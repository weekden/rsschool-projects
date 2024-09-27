export function ImageGaleryView() {
	let myContainer = null;
	// Инициализируем view и связываем ее с контейнером для работы.
	this.init = container => {
		myContainer = container;
	};

	this.renderPhotos = dataPhotos => {
		const photosContainer = myContainer.querySelector('.images-wrapper');
		photosContainer.innerHTML = '';
		dataPhotos.forEach(elem => {
			const img = document.createElement('img');
			img.alt = elem.alt_description;
			img.src = elem.urls.small;
			photosContainer.append(img);
		});
	};

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
