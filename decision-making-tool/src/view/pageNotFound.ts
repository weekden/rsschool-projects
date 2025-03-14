export class NotFoundView {
  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.textContent = '404 - Page Not Found';
    return container;
  }
}
