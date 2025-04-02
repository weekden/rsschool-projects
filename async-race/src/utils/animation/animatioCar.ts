export function animateRaceCar(carElement: HTMLElement, duration: number, containerWidth: number): void {
  carElement.style.transition = `transform ${duration}ms`;
  carElement.style.transform = `translateX(${containerWidth - carElement.clientWidth}px)`;
}

export function setCarsToStart(carElement: HTMLElement): void {
  carElement.style.transition = 'none';
  carElement.style.transform = `translateX(0px)`;
}
