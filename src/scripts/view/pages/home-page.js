import Page from './page';

class HomePage extends Page {
  constructor() {
    super({
      basePageElement: /* html */`
        <hero-element></hero-element>
        <section id="/main-content" class="container">
        <section class="latest"><h1>Explore Restaurant</h1>
        </section>
        </section>
      `,
      contentElement: 'restaurant-list',
    });
  }

  get isHasHeroElement() {
    return true;
  }

  _showContent() {
    this.contentElement.restaurantList = this._data;
  }
}

customElements.define('home-page', HomePage);
