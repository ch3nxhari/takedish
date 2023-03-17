import logoIcon from '../../public/images/icons/logo1.svg';
import Presenter from './presenter';

class RestaurantListPresenter extends Presenter {
  constructor({view, model}) {
    super({view, model});
  }

  async showContent() {
    try {
      const allRestaurantList = await this._model.getAllRestaurant();
      if (allRestaurantList.length > 0) {
        this._displayContent(allRestaurantList);
      } else {
        this._displayMessage('Its empty here...');
        this._displayImage(logoIcon);
      }
    } catch (error) {
      this._displayMessage(error.message);
    }
  }
}

export default RestaurantListPresenter;
