import { ImageGaleryController } from './controller.js';
import { ImageGaleryModel } from './model.js';
import { ImageGaleryView } from './view.js';

const container = document.querySelector("#image-galery")

const controller = new ImageGaleryController();
const model = new ImageGaleryModel();
const view = new ImageGaleryView();

model.init(view);
view.init(container);
controller.init(model, container);