/* eslint-disable max-len */
import CONFIG from '../../global/config';

class RestaurantInfo extends HTMLElement {
  set mainInfo(mainInfo) {
    this._mainInfo = mainInfo;
    this._showMainInfo();
  }

  _showMainInfo() {
    const {
      name,
      city,
      address,
      pictureId,
      rating,
      description,
      categories,
      menus,
    } = this._mainInfo;

    const restaurantCategories = this._createList(categories);
    const restaurantFoodMenu = this._createList(menus.foods);
    const restaurantdrinksMenu = this._createList(menus.drinks);

    this.innerHTML = /* html */`
    <section class="info" role="region" aria-labelledby="info-heading">
    <div class="thumbnail">
    <div class="restaurant-img">
    <h1 id="restaurant-name">${name}</h1>
    <img src="${CONFIG.SMALL_BASE_IMAGE_URL}${pictureId}" alt="Gambar restaurant ${name}">
    </div>
    </div>
  
    <article class="main-info">
    <h2 id="info-heading">Informasi</h2>
    <h3>Alamat</h3>
      <p>${address}</p>
      <h3>Kota</h3>
      <p>${city}</p>
      <h3>Rating</h3>
      <p>${rating}</p>
      <h3>Ketegori Menu</h3>
      <ul>
        ${restaurantCategories}
      </ul>
    </article>
    </section>

    <article class="description" role="article">
    <h1 id="restaurant-h1">Deskripsi</h1>
    <div class="desc_content">
      <p>${description}</p>
    </div>
    </article>
  
    <article class="restaurant-menus">
      <h2>Daftar Menu</h2>
      <div class="menus">
        <div>
          <h3>Makanan</h3>
          <ul>
            ${restaurantFoodMenu}
          </ul>
        </div>
        <div>
          <h3>Minuman</h3>
          <ul>
            ${restaurantdrinksMenu}
          </ul>
        </div>
      </div>
    </article>
  `;
  }

  /**
   * Create list (li) element from items array.
   * @param {Array} items The array of items to iterate over.
   * @return {String} a html list (li).
   */
  _createList(items) {
    let li = '';
    items.forEach(({name}) => {
      li += /* html */`<li>${name}</li>`;
    });
    return li;
  }
}

customElements.define('restaurant-info', RestaurantInfo);
