export class Header {
  private readonly header: HTMLHeadElement;

  constructor() {
    this.header = document.createElement('h1');
    this.header.textContent = 'Decision Making Tool';
    this.header.classList = 'header';
  }

  public render(): HTMLHeadElement {
    return this.header;
  }
}
