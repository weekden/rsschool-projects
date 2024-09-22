function AudioPlayerController() {
	let myModel = null;
	let myContainer = null;

	// Инициализируем контроллер и связываем модель с которой работаем и контейнер внутри которого будем работать
	this.init = function (model, container) {
		myModel = model;
		myContainer = container;
		// Объявляем обработчики событий для кнопок управления
		const btnPrevTrack = myContainer.querySelector('#prev-track');
		btnPrevTrack.addEventListener('click', this.getPrevTrack);

		const btnNextTrack = myContainer.querySelector('#next-track');
		btnNextTrack.addEventListener('click', this.getNextTrack);

		const btnPlayPause = myContainer.querySelector('#play-pause');
		btnPlayPause.addEventListener('click', this.togglePlayPause);

		const progressBarContainer = myContainer.querySelector('.progress-bar__container');
		progressBarContainer.addEventListener('click', this.getProgressWidth);
		// событие по окончанию трека
		const audioElement = myContainer.querySelector('audio');
		audioElement.addEventListener('ended', this.getNextTrack);

		const btnTrackList = myContainer.querySelector('#track-list');
		btnTrackList.addEventListener('click', this.getTrackList);

		const btnShuffle = myContainer.querySelector('#shuffle');
		btnShuffle.addEventListener('click', this.shuffleTracks);
	};
	// Назначаем обработчики событий для кнопок предыдущего и следующего треков
	this.getPrevTrack = function () {
		myModel.getPrevTrack();
	};

	this.getNextTrack = function () {
		myModel.getNextTrack();
	};
	// Назначаем обработчики событий для кнопоки play/pause
	this.togglePlayPause = function () {
		myModel.togglePlayPause();
	};
	// Назначаем обработчики событий для перемотки трека по клику на прогресс-бар
	this.getProgressWidth = function (event) {
		const progressWidth = this.offsetWidth; // общая ширина проогрес-бара
		const clickX = event.offsetX; // координата X по клику
		myModel.setProgressWidth(progressWidth, clickX);
	};
    // назначаем обработчик на отображение списка треков
	this.getTrackList = function () {
        // используем дилигирование вешаем обработчик на родителя
		const trackListElem = myContainer.querySelector('.tracklist-container');
		trackListElem.addEventListener('click', event => {
            // проверяем что клик был по li
			const clickedElement = event.target.closest('.tracklist-li');
            // если был по li то получаем индекс из атрибута который сетали при создании списка
			if (clickedElement) {
				const trackIndex = clickedElement.getAttribute('data-index');
                // передаем в модель индекс
				myModel.playTrack(trackIndex);
			}
		});
		myModel.getTrackList();
	};
    // обработчик для кнопки shuffle
	this.shuffleTracks = function () {
		myModel.toggleShuffle();
	};
}

function AudioPlayerModel() {
	let myView = null;
	let tracks = [];
	let currentTrackIndex = 0;
	let trackInfoObj = {};
	let isPlayed = false;
	let isShuffle = false;
	let isShowTackList = false;
	let startTracksArr = null;
	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение треков
	this.init = function (view) {
		myView = view;
		this.fetchTracks();
	};

	// запрос на получение 10 популярныз треков сохраняем не сортированный массив и по получении данных вызываем загрузку трека
	this.fetchTracks = function () {
		const clientId = '9f39c9c0';
		const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&order=popularity_total`;

		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				tracks = data.results;
				startTracksArr = tracks.slice();
				this.loadCurrentTrack();
			})
			.catch(error => console.error('Ошибка при загрузке треков:', error));
	};

	// формируем объект с данными необходимымыми для дальнейшей работы
	this.loadCurrentTrack = function () {
		let track = tracks[currentTrackIndex];
		trackInfoObj = {
			author: track.artist_name,
			'track-name': track.name,
			album: track.album_name,
			'album-img': track.album_image,
			'audio-src': track.audio,
			duration: track.duration,
		};

		// проверяем если есть view то передаем объект во view
		if (myView) {
			myView.initPlayer(trackInfoObj);
			myView.updatePlayerTime(trackInfoObj);
			myView.createTrackList(tracks);
		}
	};
	// функция перехода к след треку
	this.getNextTrack = function () {
		currentTrackIndex++;
		if (currentTrackIndex >= tracks.length) {
			currentTrackIndex = 0;
		}
		this.loadCurrentTrack();
		myView.playPauseSong(isPlayed);
	};
	// функция перехода к предыдущему треку
	this.getPrevTrack = function () {
		currentTrackIndex--;
		if (currentTrackIndex < 0) {
			currentTrackIndex = tracks.length - 1;
		}
		this.loadCurrentTrack();
		myView.playPauseSong(isPlayed);
	};
	// функция переключения состояния флага играет или не играет и предаем во view
	this.togglePlayPause = function () {
		isPlayed = !isPlayed;

		myView.playPauseSong(isPlayed);
	};

	// получаем новое значение времени при перемотке на прогрес-баре и предаем во view
	this.setProgressWidth = function (width, click) {
		const newTime = (click / width) * trackInfoObj.duration;
		trackInfoObj.newTime = newTime;
		myView.updatePlayerTime(trackInfoObj);
	};
	// перемешиваем треки и в зависимости от флага вызываем загрузку трека в прямом или случайном порядке
	this.toggleShuffle = function () {
		isShuffle = !isShuffle;
        isPlayed = !isPlayed
		if (isShuffle) {
			tracks = tracks.sort(() => Math.random() - 0.5);
		} else {
			tracks = startTracksArr.slice();
		}
		currentTrackIndex = 0;
		this.loadCurrentTrack();
		this.togglePlayPause();
		myView.toggleShuffle(isShuffle);
	};
    // назначаем флаг и у вью вызываем функцию показа списка
	this.getTrackList = function () {
		isShowTackList = !isShowTackList;
		myView.toggleShowTrackList(isShowTackList);
	};
    // запуск трека по полученому индексу из списка
	this.playTrack = function (index) {
        isPlayed = !isPlayed
		currentTrackIndex = index;
		this.loadCurrentTrack();
		this.togglePlayPause();
	};
}

function AudioPlayerView() {
	let myContainer = null;
	// Инициализируем view и связываем ее с контейнером для работы.
	this.init = function (container) {
		myContainer = container;
	};
	// инициализируем плеер с неизменными данными для текущего трека
	this.initPlayer = function (trackInfo) {
		const audioElement = myContainer.querySelector('audio');
		const trackTitleElement = myContainer.querySelector('.track-name');
		const artistElement = myContainer.querySelector('.author');
		const albumNameElement = myContainer.querySelector('.album');
		const albumImageElement = myContainer.querySelector('.album-img');
		const apBackground = myContainer.querySelector('.ap-background');
		const iconPause = myContainer.querySelector('.fa-pause');

		audioElement.src = trackInfo['audio-src'];
		trackTitleElement.textContent = trackInfo['track-name'];
		artistElement.textContent = trackInfo.author;
		albumNameElement.textContent = trackInfo.album;
		albumImageElement.src = trackInfo['album-img'];

		apBackground.style.backgroundImage = `url(${trackInfo['album-img']})`;
		iconPause.style.display = 'none';
	};
	// управление состоянием audio played or paused
	this.playPauseSong = function (isPlayed) {
		const audioElement = myContainer.querySelector('audio');
		const iconPlay = myContainer.querySelector('.fa-play');
		const iconPause = myContainer.querySelector('.fa-pause');
		if (isPlayed) {
			audioElement.play();
			iconPlay.style.display = 'none';
			iconPause.style.display = 'block';
		} else {
			audioElement.pause();
			iconPause.style.display = 'none';
			iconPlay.style.display = 'block';
		}
	};

	this.toggleShuffle = function (isShuffle) {
		const iconShuffle = myContainer.querySelector('.fa-shuffle');
		if (isShuffle) {
			iconShuffle.style.color = 'darkgrey';
		} else {
			iconShuffle.style.color = 'white';
		}
	};

	// одновление времени проигрывания и положения прогрес-бара
	this.updatePlayerTime = function (trackInfo) {
		const audioElement = myContainer.querySelector('audio');
		const currentTimeElem = myContainer.querySelector('#current-time');
		const durationTimeElem = myContainer.querySelector('#duration-time');
		const trackProgresBar = myContainer.querySelector('.progress-bar');

		// проверяем задано новое время
		if (trackInfo.newTime) {
			audioElement.currentTime = trackInfo.newTime;
		} else {
			audioElement.currentTime = 0;
		}

		// Обновляем время трека и прогресс-бара
		const updateTime = function () {
			const currentTime = audioElement.currentTime;
			const duration = trackInfo.duration;

			if (duration) {
				const progressPercent = (currentTime / duration) * 100;
				// время для прямого отсчета
				const minutes = Math.floor(currentTime / 60);
				const seconds = Math.floor(currentTime % 60);
				// время для обратного отсчета
				const remainingTime = duration - currentTime;
				const remainingMinutes = Math.floor(remainingTime / 60);
				const remainingSeconds = Math.floor(remainingTime % 60);

				// обновляем прогресс-бар и отображаемое время
				trackProgresBar.style.width = `${progressPercent}%`;
				currentTimeElem.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
				durationTimeElem.innerHTML = `-${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
				if (remainingTime < 0) durationTimeElem.innerHTML = '-0:00';
			}
		};

		// удаляем обработчик перед добавлением нового
		audioElement.removeEventListener('timeupdate', updateTime);
		audioElement.addEventListener('timeupdate', updateTime);

		updateTime();
	};
    // отображение трек листа
	this.createTrackList = function (tracks) {
		const trackListContainer = myContainer.querySelector('.tracklist-container');
		trackListContainer.innerHTML = '';
		tracks.forEach((element, index) => {
			const trackLi = document.createElement('li');
			trackLi.setAttribute('data-index', index);
			trackLi.classList.add('tracklist-li');

			const trackListImg = document.createElement('img');
			trackListImg.classList.add('trackList-img');
			trackListImg.src = element.album_image;
			trackListImg.alt = element.album_name;

            const trackArtistName = document.createElement("p");
            trackArtistName.classList.add("tracklist-track")
            trackArtistName.textContent = `${element.artist_name} - ${element.name}`

			const trackDuration = document.createElement('span');
			const minutes = Math.floor(element.duration / 60);
			const seconds = element.duration % 60;
			trackDuration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

			trackLi.append(trackListImg, trackArtistName, trackDuration);
			trackListContainer.append(trackLi);
		});
	};
    // изменение отображения кнопки показа списка
	this.toggleShowTrackList = function (isShowTackList) {
		const trackListContainer = myContainer.querySelector('.tracklist-container');
		const iconTrackList = myContainer.querySelector('.fa-bars');
		if (isShowTackList) {
			trackListContainer.classList.toggle('show-tacklist');
			iconTrackList.style.color = 'darkgrey';
         
		} else {
			trackListContainer.classList.remove('show-tacklist');
			iconTrackList.style.color = 'white';
           
		}
	};
}

const container = document.querySelector('#audio-player');
const controller = new AudioPlayerController();
const model = new AudioPlayerModel();
const view = new AudioPlayerView();

model.init(view);
view.init(container);
controller.init(model, container);


const check = `
Самопроверка
1. Вёрстка +10
    - вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
    - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2. Кнопка Play/Pause +10
    - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
    - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
    - при кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
    - при смене аудиотрека меняется изображение - обложка аудиотрека +10
    - прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
   - отображается продолжительность аудиотрека и его текущее время проигрывания +10

3. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

Так же хочу добавить, при написании данной работы использовал MVC паттерн. А также все данные для работы плеера получал по средствам API при помощи feth запросов с сервиса https://api.jamendo.com
Было еще несколько задумок для реализации, но в стлу того, что на работу было потрачено 3 дня всего не успел.`
console.log(check)