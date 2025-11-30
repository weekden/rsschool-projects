import type { NavModel } from '../model';

export class NavController {
  constructor(private model: NavModel) {}

  public navigate(route: string): void {
    this.model.setRoute(route);
  }
}
