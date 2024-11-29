const cyrcle = document.querySelector('.return-circle');
const scrollPositionForShowCircle = 300;
const showCircle = () => {
	if (window.scrollY >= scrollPositionForShowCircle) {
		cyrcle.classList.add('show-item');
	} else {
		cyrcle.classList.remove('show-item');
	}
};
window.addEventListener('scroll', () => {
	if (window.location.pathname.includes('gifts.html')) showCircle();
});
