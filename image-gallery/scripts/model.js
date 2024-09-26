export function ImageGaleryModel() {
    const APIKEY = "YGpA_nVYwXCpsdf69TdkUOVpuDVAoD7RBzANUxK0AHQ";
	let myView = null;
	let currentColectionIndex = 1;
    let quertyWord = "";
    let urlSearch = ""

	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение foto
	this.init = function (view) {
		myView = view;
		// this.fetchPhotos();
	};

  

    this.fetchPhotos = async function () {
        const url = `https://api.unsplash.com/${urlSearch}photos?page=${currentColectionIndex}&query=${quertyWord}&per_page=12&client_id=${APIKEY}`
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok) {
                const dataPhotos = urlSearch ? data.results : data
                console.log(dataPhotos)
                myView.renderPhotos(dataPhotos);
            }
         
        } catch (error) {
            console.error("Ошибка в получении фото", error);
        }
    
    }

    this.setPrevColectionNumber = function () {
        currentColectionIndex --
        // this.fetchPhotos();
    }

    this.setNextColectionNumber = function () {
        currentColectionIndex ++
        // this.fetchPhotos();
    }

    this.setQuertyWord = function(query) {
        urlSearch = "search/"
        quertyWord = query;
        currentColectionIndex = 1;
        console.log(quertyWord)
        // this.fetchPhotos();
    }
}



