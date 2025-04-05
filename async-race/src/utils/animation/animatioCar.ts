export function animateRaceCar(carElement: HTMLElement, duration: number, containerWidth: number): void {
  const carElementWidth = carElement.offsetWidth;
  console.log(containerWidth);
  carElement.style.transition = `transform ${duration}ms linear`;
  carElement.style.transform = `translateX(${containerWidth - carElementWidth}px)`;
}

export function setCarsToStart(carElement: HTMLElement): void {
  carElement.style.transition = 'none';
  carElement.style.transform = `translateX(0px)`;
}

export function animateStopCar(carElement: HTMLElement): void {
  const computedStyle = getComputedStyle(carElement);
  const currentTransform = computedStyle.transform;

  carElement.style.transition = 'none';
  carElement.style.transform = currentTransform;
}
