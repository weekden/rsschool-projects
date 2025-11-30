export const onElementRemoved = (element: HTMLElement, callback: () => void): void => {
  if (!element.parentNode) {
    return;
  }

  const observer = new MutationObserver((mutations): void => {
    for (const mutation of mutations) {
      for (const node of mutation.removedNodes) {
        if (node === element) {
          callback();
          observer.disconnect();
          return;
        }
      }
    }
  });

  observer.observe(element.parentNode, { childList: true });
};
