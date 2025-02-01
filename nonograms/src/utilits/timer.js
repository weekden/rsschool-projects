export function formatTime(value) {
	return value < 10 ? `0${value}` : value;
}

export function startTimer(container, minuts, seconds, _saveObj) {
	updateTimer(container, minuts, seconds, _saveObj);
	renderTimer(container, minuts, seconds);
}

function updateTimer(container, minuts, seconds, _saveObj) {
	setTimeout(() => {
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
