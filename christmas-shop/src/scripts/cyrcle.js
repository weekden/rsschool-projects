const cyrcle = document.querySelector('.return-circle');
const showCircle = () => {
	if (window.scrollY) {
		cyrcle.classList.add('show-item');
	} else {
		cyrcle.classList.remove('show-item');
	}
};
window.addEventListener('scroll', () => {
	if (window.location.pathname === '/pages/gifts.html') showCircle();
});
