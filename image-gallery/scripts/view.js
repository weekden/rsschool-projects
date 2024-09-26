export function ImageGaleryView() {
    let myContainer = null;
	// Инициализируем view и связываем ее с контейнером для работы.
	this.init = function (container) {
		myContainer = container;
        // this.renderPhotos();
	};

    this.renderPhotos = function(dataPhotos) {
   
        console.log(dataPhotos)
        const photosContainer = myContainer.querySelector(".images-wrapper")
        photosContainer.innerHTML = '';
        dataPhotos.forEach(elem => {
            const img = document.createElement("img")
            img.alt = elem.alt_description;
            img.src = elem.urls.small
            photosContainer.append(img)
        });

    }
}