export class NavModel {
  public setRoute(route: string): void {
    location.hash = route;
  }
}
