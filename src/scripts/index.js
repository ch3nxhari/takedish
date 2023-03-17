import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../styles/style.less';
import './view/components';
import App from './view/app';
import {swRegister, getElement} from './helper';
import WebSocketInitiator from './helper/websocket-initiator';
import CONFIG from './global/config';

const app = new App({
  appBar: getElement('app-bar'),
  contentContainer: getElement('#content'),
});

window.addEventListener('load', () => {
  app.renderContent();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});

window.addEventListener('hashchange', () => {
  app.renderContent();
});
