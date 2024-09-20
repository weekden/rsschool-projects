function AudioPlayerController() {
	let myModel = null;
	let myContainer = null;
	this.init = function (model, container) {
		myModel = model;
		myContainer = container;

		const btnPrevTrack = myContainer.querySelector('#prev-track');
		btnPrevTrack.addEventListener('click', this.getPrevTrack);

		const btnNextTrack = myContainer.querySelector('#next-track');
		btnNextTrack.addEventListener('click', this.getNextTrack);

		const btnPlayPause = myContainer.querySelector('#play-pause');
		btnPlayPause.addEventListener('togle', this.playPuseTrack);
	};

	this.getPrevTrack = function () {
		myModel.getPrevTrack();
	};

	this.getNextTrack = function () {
		myModel.getNextTrack();
	};

	this.playPuseTrack = function () {
		myModel.playPuseTrack();
	};
}

function AudioPlayerModel() {
	let myView = null;
	let tracks = [];
	let currentTrackIndex = 0;
	let trackInfoObj = {};
	let isPlayed = false;

	this.init = function (view) {
		myView = view;
		this.fetchTracks();
	};

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
	};

	this.getNextTrack = function () {
		currentTrackIndex++;
		if (currentTrackIndex >= tracks.length) {
			currentTrackIndex = 0;
		}
		this.loadCurrentTrack();
	};

	this.getPrevTrack = function () {
		currentTrackIndex--;
		if (currentTrackIndex < 0) {
			currentTrackIndex = tracks.length - 1;
		}
		this.loadCurrentTrack();
	};

}

function AudioPlayerView() {
	let myContainer = null;

	this.init = function (container) {
		myContainer = container;
	};
}

const container = document.querySelector('#audio-player');
const controller = new AudioPlayerController();
const model = new AudioPlayerModel();
const view = new AudioPlayerView();

model.init(view);
view.init(container);
controller.init(model, container);
