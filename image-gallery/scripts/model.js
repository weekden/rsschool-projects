export function ImageGaleryModel() {
	const APIKEY = 'YGpA_nVYwXCpsdf69TdkUOVpuDVAoD7RBzANUxK0AHQ';
	let myView = null;
	let currentColectionIndex = 1;
	let coinImageAtPage = 12;
	let dataPhotos = null;
	let quertyWord = '';
	let urlSearch = "";

	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение foto
	this.init = view => {
		myView = view;
		this.fetchPhotos();
	};

	this.fetchPhotos = async function () {
	    let url = `https://api.unsplash.com/${urlSearch}photos?page=${currentColectionIndex}${quertyWord}&per_page=${coinImageAtPage}&client_id=${APIKEY}`
	    try {
	        const response = await fetch(url);
	        const data = await response.json();
	       console.log(data)
	        if(response.ok) {
	            if(quertyWord) {
	             dataPhotos = data.results
              
	            } else {
	            dataPhotos = data
	            }
                this.setPaginationOgj(data)
	            myView.renderPhotos(dataPhotos);
	            myView.checkStateInputSearch(urlSearch);
	            
	        }

	    } catch (error) {
	        console.error("Ошибка в получении фото", error);
	    }
	}

	this.setPrevColectionNumber = () => {
		currentColectionIndex--;
		this.fetchPhotos();
	};

	this.setNextColectionNumber = () => {
		currentColectionIndex++;
		this.fetchPhotos();
	};

	this.setQuertyWord = query => {
		urlSearch = "search/"
		quertyWord = `&query=${query}`;
		currentColectionIndex = 1;
		this.fetchPhotos();
        
	};

	this.resetSearch = () => {
        currentColectionIndex = 1
		urlSearch = '';
		quertyWord = '';
		this.fetchPhotos();
	};

	this.setPaginationOgj = (data) => {
	   const paginationObj = {
	        pageNumber: currentColectionIndex,
            coinPages: Math.floor(data.total / coinImageAtPage)
	    }
        myView.renderPagination(paginationObj)
        console.log(paginationObj)
	}
}
