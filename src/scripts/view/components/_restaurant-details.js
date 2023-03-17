import {createElement} from '../../helper';

class RestaurantDetails extends HTMLElement {
  connectedCallback() {
    this._renderSkeleton();
  }

  /**
   * @param {Object} details
   */
  set details(details) {
    this._details = details;
    this._render();
  }

  _renderSkeleton() {
    this.innerHTML = /* html */`
      <div class="description skeleton">
        <div class="skeleton_head"></div>
        <div class="desc_content">
          <div class="skeleton_body"></div>
          <div class="skeleton_body"></div>
        </div>
      </div>
      
      <div class="info">
        <div class="main-info">
          <div class="skeleton_head"></div>
          <div class="skeleton_body"></div>
        </div>
        <div class="restaurant-menus">
          <div class="skeleton_head"></div>
          <div class="menus">
            <div class="skeleton_body"></div>
            <div class="skeleton_body"></div>
          </div>
        </div>
      </div>
    `;
  }

  _render() {
    const {
      name,
      description,
      city,
      address,
      pictureId,
      categories,
      menus,
      rating,
      customerReviews,
    } = this._details;

    this.innerHTML = '';

    const mainInfoElement = createElement('restaurant-info');
    this.appendChild(mainInfoElement);

    const reviewElement = createElement('restaurant-review');
    this.appendChild(reviewElement);

    this._favButton = createElement('button');
    this._favButton.id = 'fav-button';
    this.appendChild(this._favButton);

    mainInfoElement.mainInfo = {
      name,
      city,
      address,
      pictureId,
      rating,
      description,
      categories,
      menus,
    };

    reviewElement.reviews = customerReviews;
  }

  /**
   * Set favorite button state
   * @param {boolean} isFavorited
   */
  set favButtonState(isFavorited) {
    const icon = isFavorited ? '×' : '+';
    const label = isFavorited ?
      'Hapus restaurant ini dari daftar favorite Anda' :
      'Tambahkan restaurant ini ke daftar favorite Anda';

    this._favButton.textContent = icon;
    this._favButton.ariaLabel = label;
    this._favButton.title = label;
  }
}

customElements.define('restaurant-details', RestaurantDetails);
