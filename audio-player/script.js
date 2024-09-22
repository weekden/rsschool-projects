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
		console.log(progressWidth);
		console.log(clickX);
		myModel.setProgressWidth(progressWidth, clickX);
	};
}

function AudioPlayerModel() {
	let myView = null;
	let tracks = [];
	let currentTrackIndex = 0;
	let trackInfoObj = {};
	let isPlayed = false;
	// Инициализируем модель и связываем ее с view. При инициализации делаем запрос на получение треков
	this.init = function (view) {
		myView = view;
		this.fetchTracks();
	};
	// запрос на получение 10 популярныз треков
	this.fetchTracks = function () {
		const clientId = '9f39c9c0';
		const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&order=popularity_total`;

		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				tracks = data.results;
				this.loadCurrentTrack();
			})
			.catch(error => console.error('Ошибка при загрузке треков:', error));
	};

	// формируем объект с данными необходимымыми для дальнейшей работы
	this.loadCurrentTrack = function () {
		const track = tracks[currentTrackIndex];
		trackInfoObj = {
			author: track.artist_name,
			'track-name': track.name,
			album: track.album_name,
			'album-img': track.album_image,
			'audio-src': track.audio,
			duration: track.duration,
		};

		console.log(track);
		// проверяем если есть view то передаем объект во view
		if (myView) {
			myView.initPlayer(trackInfoObj);
			myView.updatePlayerTime(trackInfoObj);
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
        const iconPause = myContainer.querySelector(".fa-pause")

		audioElement.src = trackInfo['audio-src'];
		trackTitleElement.textContent = trackInfo['track-name'];
		artistElement.textContent = trackInfo.author;
		albumNameElement.textContent = trackInfo.album;
		albumImageElement.src = trackInfo['album-img'];

		apBackground.style.backgroundImage = `url(${trackInfo['album-img']})`;
        iconPause.style.display = "none"
	};
	// управление состоянием audio played or paused
	this.playPauseSong = function (isPlayed) {
		const audioElement = myContainer.querySelector('audio');
        const iconPlay = myContainer.querySelector(".fa-play")
        const iconPause = myContainer.querySelector(".fa-pause")
		if (isPlayed) {
			audioElement.play();
            iconPlay.style.display = "none"
            iconPause.style.display = "block"
		} else {
			audioElement.pause();
            iconPause.style.display = "none"
            iconPlay.style.display = "block"
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
}

const container = document.querySelector('#audio-player');
const controller = new AudioPlayerController();
const model = new AudioPlayerModel();
const view = new AudioPlayerView();

model.init(view);
view.init(container);
controller.init(model, container);
