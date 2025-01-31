export function formatTime(value) {
	return value < 10 ? `0${value}` : value;
}

export function startTimer(container, minuts, seconds) {
	updateTimer(container, minuts, seconds);
	renderTimer(container, minuts, seconds);
}

function updateTimer(container, minuts, seconds) {
	setTimeout(() => {
		seconds++;
		if (seconds === 60) {
			seconds = 0;
			minuts++;
		}
		renderTimer(container, minuts, seconds);
		updateTimer(container, minuts, seconds);
	}, 1000);
}

function renderTimer(container, minuts, seconds) {
	container.textContent = `${formatTime(minuts)} : ${formatTime(seconds)}`;
}
