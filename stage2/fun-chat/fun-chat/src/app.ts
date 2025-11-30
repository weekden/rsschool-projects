import { Router } from './routes/router';
import { AppModel } from './models/appModel';
import { ChatPage } from './pages/chatPage';
import { LoginPage } from './pages/loginPage';
import { createElement } from './utils/dom/customElement';
import { Routes } from './types';
import { AboutPage } from './pages/aboutPage';
import { NotFoundPage } from './pages/notFoundPage';
import { socketService } from './API/webSocketService';
import { createPopup } from './components/utils/creteInformPopup';

const popup = createPopup('🔌 Соединение с сервером потеряно', false);
document.body.append(popup);
function showConnectionModal(): void {
  popup.style.visibility = 'visible';
}

function hideConnectionModal(): void {
  popup.style.visibility = 'hidden';
}

socketService.onDisconnect(() => {
  showConnectionModal();
});

socketService.onReconnect(() => {
  hideConnectionModal();
});

const mainContainer = createElement({ tag: 'div', classes: ['app-wrapper'] });
document.body.append(mainContainer);
const routes: Routes = {
  '/login': LoginPage,
  '/chat': ChatPage,
  '/about': AboutPage,
  '/not-found': NotFoundPage,
};

export const router = new Router(routes, mainContainer, new AppModel());
