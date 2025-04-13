import { Header } from '../components/Header';
import { DecisionControl } from '../components/ControlDecision';
import { ShowPickedOption } from '../components/PickedOption';
import { Wheel } from '../components/Wheel';
import { LSControl } from '../utils/storage/lsControl';
import { createPopup } from '../utils/dom/createPopup';

export class Decision {
  private readonly header: Header;
  private readonly control: DecisionControl;
  private readonly pickedOption: ShowPickedOption;
  private readonly wheel: Wheel;

  constructor() {
    this.header = new Header();
    this.control = new DecisionControl((controlObject) => this.wheel.runAnimation(controlObject));
    this.pickedOption = new ShowPickedOption();
    this.wheel = new Wheel();
  }

  public render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'app-container';
    container.append(this.header.render(), this.control.render(), this.pickedOption.render(), this.wheel.render());
    this.checkAfterRender();
    return container;
  }

  private checkAfterRender(): void {
    const list = LSControl.getListForRender();

    if (!list || list.length < 2) {
      window.location.hash = '/';
      setTimeout(() => {
        createPopup({
          content: `Please add at least 2 valid options.
        
                An option is considered valid if its title is not empty and its weight is greater than 0
                `,
          buttons: [
            {
              text: 'Cancel',
              onClick: (popup): void => {
                popup?.remove();
              },
            },
          ],
        });
      }, 0);
    }
  }
}
