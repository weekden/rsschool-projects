const cyrcle = document.querySelector('.return-circle');
const scrollPositionForShowCircle = 300;
const showCircle = () => {
	if (window.scrollY >= scrollPositionForShowCircle &&
      window.innerWidth <= 768
  ) {
		cyrcle.classList.add('show-item');
	} else {
		cyrcle.classList.remove('show-item');
	}
};
window.addEventListener('scroll', () => {
	if (window.location.pathname.includes('gifts.html')) showCircle();
});

window.addEventListener('resize', () => {
	if (window.location.pathname.includes('gifts.html')) showCircle();
});
