import { Header } from '../components/Header';
import { DecisionControl } from '../components/ControlDecision';
import { ShowPickedOption } from '../components/PickedOption';

export class Decision {
  private readonly header: Header;
  private readonly control: DecisionControl;
  private readonly pickedOption: ShowPickedOption;

  constructor() {
    this.header = new Header();
    this.control = new DecisionControl();
    this.pickedOption = new ShowPickedOption();
  }

  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'app-container';
    container.append(this.header.render(), this.control.render(), this.pickedOption.render());
    return container;
  }
}
