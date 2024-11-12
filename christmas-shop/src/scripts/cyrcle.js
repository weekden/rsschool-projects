const cyrcle = document.querySelector('.return-circle');
const showCircle = () => {
  if (window.scrollY && window.innerWidth <= 768) {
    cyrcle.classList.add('show-item');
  } else {
    cyrcle.classList.remove('show-item');
  }
}
window.addEventListener('load', showCircle)
window.addEventListener('resize', showCircle)
window.addEventListener('scroll', showCircle)