const btnRight = document.querySelector('#slide-right');
const btnLeft = document.querySelector('#slide-left');
const slider = document.querySelector('.slider')

let counter = 0;
let maxCount = null;

const changeSliderPosition = offset => {
	slider.style.transform = `translateX(${offset}px)`;
  updateControlBtn();
};

const updateControlBtn = () => {
	!counter ? btnLeft.classList.add('slide-btn__disabled') : btnLeft.classList.remove('slide-btn__disabled');
	counter === maxCount ? btnRight.classList.add('slide-btn__disabled') : btnRight.classList.remove('slide-btn__disabled');
};

const calculationSlideWidth = () => {
	const sliderWrapperWidth = document.querySelector('.slider-inner').offsetWidth;
  const sliderWidth = slider.offsetWidth;
  const slideWidth = (sliderWidth - sliderWrapperWidth) / maxCount;
	return slideWidth;
};

const updateMaxCountAndSlideWidth  = () => {
  maxCount = window.innerWidth <= 768 ? 6 : 3;
  counter = 0;
  changeSliderPosition(counter);
}

if (window.location.pathname.includes('index.html')) {
window.addEventListener('load', updateMaxCountAndSlideWidth );
window.addEventListener('resize', updateMaxCountAndSlideWidth );
}
btnRight.addEventListener('click', () => {
		counter++;
		changeSliderPosition(-calculationSlideWidth() * counter);
});

btnLeft.addEventListener('click', () => {
		counter--;
		changeSliderPosition(-calculationSlideWidth() * counter);
});