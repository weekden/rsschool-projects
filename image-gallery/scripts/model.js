export function ImageGaleryModel() {
    const APIKEY = "YGpA_nVYwXCpsdf69TdkUOVpuDVAoD7RBzANUxK0AHQ";
	let myView = null;
	let currentColectionIndex = 1;
    let dataPhotos = null;
    let isSearch = false;
    let quertyWord = "";
    let urlSearch = ""

	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение foto
	this.init = (view) => {
		myView = view;
		this.fetchPhotos(); 
	};

    this.fetchPhotos = async () => {
        const url = `https://api.unsplash.com/${urlSearch}photos?page=${currentColectionIndex}&query=${quertyWord}&per_page=12&client_id=${APIKEY}`

        try {
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok) {
               
                if(urlSearch) {
                 dataPhotos = data.results
                } else {
                dataPhotos = data
                }
                console.log(dataPhotos)
                myView.renderPhotos(dataPhotos);
                myView.checkStateInputSearch(urlSearch);
            }
         
        } catch (error) {
            console.error("Ошибка в получении фото", error);
        }
    }

 
    this.setPrevColectionNumber = () => {
        currentColectionIndex --
        // this.fetchPhotos();
    }

    this.setNextColectionNumber = () => {
        currentColectionIndex ++
        // this.fetchPhotos();
    }

    this.setQuertyWord = (query) => {
        urlSearch = "search/"
        quertyWord = query;
        currentColectionIndex = 1;
        this.fetchPhotos();
    }

    this.resetSearch = () => {
        urlSearch = ""
        quertyWord = ""
        this.fetchPhotos();
    }

}



