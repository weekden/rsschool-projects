import { Header } from '../components/Header';
import { DecisionControl } from '../components/ControlDecision';

export class Decision {
  private readonly header: Header;
  private readonly control: DecisionControl;

  constructor() {
    this.header = new Header();
    this.control = new DecisionControl();
  }

  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'app-container';
    container.append(this.header.render(), this.control.render());
    return container;
  }
}
