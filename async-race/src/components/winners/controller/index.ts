import { WinnersModel } from '../model';
import { WinnersView } from '../view';

export class WinnersController {
  constructor(
    private readonly model: WinnersModel,
    private readonly view: WinnersView
  ) {}
}
