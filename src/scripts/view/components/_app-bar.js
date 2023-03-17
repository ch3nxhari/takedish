import logo from '../../../public/images/icons/logo.svg';
import {getElement} from '../../helper';

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._isMenuDisplayed = false;
    this._menuItemClickHandler = this._onMenuItemClick.bind(this);
    this._pageScrollHendler = this._onPageScroll.bind(this);
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = /* html */ `
      <div class="container">
        <div>
          <a href="/" class="app-bar_logo">
            <img src="${logo}" alt="Logo" width="48px" height="48px">
            <span>TakeDish</span>
          </a>
        </div>
        <div class="nav-toggle" id="menu" tabindex="0">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <nav class="menu">
          <ul class="menu_list"></ul>
        </nav>
      </div>
    `;
  }

  setMenu(menuList) {
    const menuListElement = this.querySelector('.menu_list');
    menuList.forEach(({url, label}) => {
      const menuItemElement = /* html */ `
        <li class="menu_item">
          <a href="${url}">${label}</a>
        </li>
      `;
      menuListElement.insertAdjacentHTML('beforeend', menuItemElement);
    });
    this._initAppBar();
  }

  _initAppBar() {
    this._bodyElement = this.querySelector('body');
    this._menuButton = this.querySelector('#menu');
    this._toggleBars = this.querySelectorAll('.bar');
    this._menuItems = this.querySelectorAll('.menu_item');

    this._menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._menuHandler();
    });
    this._menuButton.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.stopPropagation();
        this._menuHandler();
      }
    });
  }

  _menuHandler() {
    this._isMenuDisplayed = !this._isMenuDisplayed;
    this._toggleMenu();
    this._isMenuDisplayed ?
      this._addMenuItemsListener() :
      this._removeMenuItemsListener();
  }

  _toggleMenu() {
    this._toggleBars.forEach((bar, index) => {
      if (this._isMenuDisplayed) {
        if (index === 0) {
          bar.style.transform = 'translateY(8px) rotate(45deg)';
        } else if (index === 1) {
          bar.style.opacity = '0';
        } else if (index === 2) {
          bar.style.transform = 'translateY(-8px) rotate(-45deg)';
        }
      } else {
        bar.style.transform = '';
        bar.style.opacity = '';
      }
    });
    this.classList.toggle('menu_open');
  }

  _addMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', this._menuItemClickHandler);
    });
  }

  _removeMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.removeEventListener('click', this._menuItemClickHandler);
    });
  }

  _onMenuItemClick(event) {
    event.stopPropagation();
    this._hideMenu();
  }

  _hideMenu() {
    if (this._isMenuDisplayed) {
      this._menuHandler();
    }
  }

  changeActiveMenuItem(url) {
    const activeMenu = getElement('.menu_item.active');
    const menuToActivate = getElement(`[href="#${url}"]`);

    activeMenu?.classList.remove('active');
    menuToActivate?.parentElement.classList.add('active');
    this._hideMenu();
  }

  set background(isContainHeroElement) {
    if (isContainHeroElement) {
      this._removeAppBarBackground();
      this._addTransition();
      window.addEventListener('scroll', this._pageScrollHendler);
    } else {
      this._removeTransition();
      window.removeEventListener('scroll', this._pageScrollHendler);
      this._addBackgroundToAppBar();
    }
  }

  _onPageScroll() {
    const mainHeader = document.querySelector('app-bar');
    const showMainHeader = () => mainHeader.style.top = '0';
    const hideMainHeader = () => mainHeader.style.top = `-70px`;
    let previousScrollPosition = window.pageYOffset;

    const HERO_ELEMENT_HEIGHT = 320;
    const pagePostion = window.pageYOffset;

    window.addEventListener('scroll', () => {
      const currentScrollPosition = window.pageYOffset;
      // eslint-disable-next-line max-len
      if (previousScrollPosition > currentScrollPosition || currentScrollPosition < HERO_ELEMENT_HEIGHT ) showMainHeader();
      else hideMainHeader();
      previousScrollPosition = currentScrollPosition;
    });

    pagePostion > HERO_ELEMENT_HEIGHT ?
      this._addBackgroundToAppBar() :
      this._removeAppBarBackground();
  }

  _addTransition() {
    this.style.transition = 'background-color 0.4s';
  }

  _removeTransition() {
    this.style.transition = null;
  }

  _addBackgroundToAppBar() {
    // this.classList.remove('no-background');
    this.classList.add('background');
  }

  _removeAppBarBackground() {
    // this.classList.add('no-background');
    this.classList.remove('background');
  }
}

customElements.define('app-bar', AppBar);
