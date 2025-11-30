export function formatTime(value) {
	return value < 10 ? `0${value}` : value;
}
let timerId = null;
export function startTimer(container, minuts, seconds, _saveObj) {
	stopTimer();
	updateTimer(container, minuts, seconds, _saveObj);
	renderTimer(container, minuts, seconds);
}

export function stopTimer() {
	if (timerId) {
		clearTimeout(timerId);
		timerId = null;
	}
}

function updateTimer(container, minuts, seconds, _saveObj) {
	timerId = setTimeout(() => {
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minuts++;
		}
		_saveObj._minuts = minuts;
		_saveObj._seconds = seconds;
		renderTimer(container, minuts, seconds);
		updateTimer(container, minuts, seconds, _saveObj);
	}, 1000);
}

function renderTimer(container, minuts, seconds) {
	container.textContent = `${formatTime(minuts)} : ${formatTime(seconds)}`;
}
