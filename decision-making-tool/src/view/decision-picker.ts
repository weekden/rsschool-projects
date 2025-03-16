import { Header } from '../components/Header';
import { DecisionControl } from '../components/ControlDecision';
import { ShowPickedOption } from '../components/PickedOption';
import { Wheel } from '../components/Wheel';

export class Decision {
  private readonly header: Header;
  private readonly control: DecisionControl;
  private readonly pickedOption: ShowPickedOption;
  private readonly wheel: Wheel;

  constructor() {
    this.header = new Header();
    this.control = new DecisionControl();
    this.pickedOption = new ShowPickedOption();
    this.wheel = new Wheel();
  }

  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'app-container';
    container.append(this.header.render(), this.control.render(), this.pickedOption.render(), this.wheel.render());
    return container;
  }
}
