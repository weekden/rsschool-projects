export function getCarElements(collection: Element[]): Element[] {
  const carElementsArray: Element[] = [];
  if (collection) {
    collection.forEach((carElement) => {
      if (carElement instanceof Element) {
        const carTrackElement = carElement.children[2]?.firstElementChild;
        if (carTrackElement instanceof Element) {
          carElementsArray.push(carTrackElement);
        }
      }
    });
  }
  return carElementsArray;
}
