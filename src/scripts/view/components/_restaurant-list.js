import {createElement} from '../../helper';

class RestaurantList extends HTMLElement {
  connectedCallback() {
    this._renderSkeleton();
  }

  /**
   * @param {Array} restaurantList An array data to iterate.
   */
  set restaurantList(restaurantList) {
    this._renderRestaurantList(restaurantList);
  }

  _renderSkeleton() {
    const numberItemSkeleton = 6;
    for (let index = 0; index < numberItemSkeleton; index++) {
      const restaurantItemElement = createElement('restaurant-item');
      restaurantItemElement.renderSkeleton();
      this.appendChild(restaurantItemElement.firstElementChild);
    }
  }

  _renderRestaurantList(restaurantList) {
    this.innerHTML = '';
    restaurantList.forEach((restaurant) => {
      const restaurantItemElement = createElement('restaurant-item');
      restaurantItemElement.restaurantData = restaurant;
      this.appendChild(restaurantItemElement.firstElementChild);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
