export function ImageGaleryController() {
	let myModel = null;
	let myContainer = null;

	// Инициализируем контроллер и связываем модель с которой работаем и контейнер внутри которого будем работать
	this.init = function (model, container) {
		myModel = model;
		myContainer = container;
		// Объявляем обработчики событий для кнопок управления
        
        const btnSearch = myContainer.querySelector("#btn-search");
        btnSearch.addEventListener("click", this.getSearchValue)

		const btnPrevCollection = myContainer.querySelector('#prev');
		btnPrevCollection.addEventListener('click', this.getPrevColection);

		const btnNextColection = myContainer.querySelector('#next');
		btnNextColection.addEventListener('click', this.getNexColection);

        const btnLastColection = myContainer.querySelector("#end");
        btnLastColection.addEventListener("click", this.getLastColectionNumber)

        const btnFirstColection = myContainer.querySelector("#start");
        btnFirstColection.addEventListener("click", this.getFirstaPageNumber)

        const numberColection = myContainer.querySelector("#page-number");
        numberColection.addEventListener("input", this.getColectionNumber);


	};
	// Назначаем обработчики событий для кнопок 
	this.getPrevColection = function () {
		myModel.setPrevColectionNumber();
	};

    this.getNexColection = function () {
        myModel.setNextColectionNumber()
    }

    this.getFirstaPageNumber = function () {
        myModel.setFirstColectionNumber();
    }

    this.getLastColectionNumber = function () {
        myModel.setLastColectionNumber();
    }
    
    this.getSearchValue = function () {
        const inputSearch = myContainer.querySelector("#input-search")
        const quertyWord = inputSearch.value;
        console.log(typeof(quertyWord))
        myModel.setQuertyWord(quertyWord)
    }

    this.getColectionNumber = function () {
        const numberColection = myContainer.querySelector("#page-number");
        const pageNumber = numberColection.value;
        console.log(pageNumber)
    }


}