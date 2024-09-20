

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

        this.getPrevTrack = function () {
            myModel.getPrevTrack()
        }

        this.getNextTrack = function () {
            myModel.getNextTrack()
        }

        this.playPuseTrack = function () {
            myModel.playPuseTrack()
        }
	};
}



const container = document.querySelector('#audio-player');
const model = new AudioPlayerModel();
const view = new AudioPlayerView();
const controller = new AudioPlayerController();
model.init(view);
view.init(container);
controller.init(model, container);
