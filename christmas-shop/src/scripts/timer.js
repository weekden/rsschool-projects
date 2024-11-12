const NEWYEAR = 1735689600;
const secondsInDay = 24 * 60 * 60;
const secondsInHour = 60 * 60;
const secondsInMinut = 60;

const getTime = () => {
	const data = new Date();
	const now = Math.floor(data.getTime() / 1000);
	const secondsAfterNewYear = NEWYEAR - now;

	const days = Math.floor(secondsAfterNewYear / secondsInDay);
	const hours = Math.floor((secondsAfterNewYear % secondsInDay) / secondsInHour);
	const minutes = Math.floor((secondsAfterNewYear % secondsInHour) / secondsInMinut);
	const seconds = secondsAfterNewYear % secondsInMinut;
	return [days, hours, minutes, seconds];
};

const render = () => {
  const date = getTime();
	const timerItemList = document.querySelectorAll('.timer__section-number');
	timerItemList.forEach((item, index) => {
		item.textContent = date[index];
	});
};
render();
setInterval(render, 1000);
