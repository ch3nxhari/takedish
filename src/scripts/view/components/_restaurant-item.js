/* eslint-disable max-len */
import locIcon from '../../../public/images/icons/location.svg';
import starIcon from '../../../public/images/icons/star.svg';
import CONFIG from '../../global/config';

class RestaurantItem extends HTMLElement {
  /**
   * @param {Object} data an Object data to render
   */
  set restaurantData(data) {
    this._restaurantData = data;
    this._render();
  }

  renderSkeleton() {
    this.innerHTML = /* html */`
      <div class="restaurant_item skeleton">
        <div class="restaurant_thumbnail">
          <div class="skeleton_body"></div>
        </div>
        <div class="restaurant_content">
          <div class="skeleton_head"></div>
          <div class="sm skeleton_body"></div>
        </div>
      </div>
    `;
  }

  _render() {
    const {
      pictureId, name, rating, city, id, description,
    } = this._restaurantData;
    this.innerHTML = /* html */`
    <article class="restaurant_item" tabindex="0">
    <a href="/#/detail/${id}" role="link">
      <div class="restaurant_thumbnail">
        <img class="lazyload"
          data-src="${CONFIG.SMALL_BASE_IMAGE_URL}${pictureId}" 
          alt="Gambar restaurant ${name}">
      </div>
    </a>
    <div class="restaurant_content">
      <a href="/#/detail/${id}" class="restaurant_name" role="heading" aria-level="2">${name}</a>
      <img class="rating" src=${starIcon} width=16px height=16px alt="star icon svg">
      <p class="restaurant_rating" aria-label="Rating"> ${rating}</p>
      <img class="city" src=${locIcon} width=16px height=16px alt="location icon svg">
      <p class="restaurant_city" aria-label="City"> ${city}</p>
      <p class="restaurant_description">${description}</p>
    </div>
  </article>
  `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
