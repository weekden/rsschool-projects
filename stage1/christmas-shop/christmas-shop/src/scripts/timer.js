const NEWYEAR = 1735689600;
const secondsInDay = 24 * 60 * 60;
const secondsInHour = 60 * 60;
const secondsInMinute = 60;

const getNewYearTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear() + 1; 
  const newYear = new Date(year, 0, 1, 0, 0, 0); 
  return Math.floor(newYear.getTime() / 1000);
};

const getTime = () => {
	const data = new Date();
  const now = Math.floor(data.getTime() / 1000);
  const NEWYEAR = getNewYearTimestamp();
  const secondsAfterNewYear = NEWYEAR - now;

	const days = Math.floor(secondsAfterNewYear / secondsInDay);
	const hours = Math.floor((secondsAfterNewYear % secondsInDay) / secondsInHour);
	const minutes = Math.floor((secondsAfterNewYear % secondsInHour) / secondsInMinute);
	const seconds = secondsAfterNewYear % secondsInMinute;
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