export class AppModel {
  private page: number = 1;

  public setPageNumber(_page: number): void {
    this.page = _page;
  }

  public getPageNumber(): number {
    return this.page;
  }
}
