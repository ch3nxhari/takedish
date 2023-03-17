/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

const clearIdb = async () => {
  const allRestaurantdata = await FavoriteRestaurantIdb.getAllRestaurant();
  allRestaurantdata.forEach(async (restaurant) => {
    await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
  });
};

export {clearIdb};
