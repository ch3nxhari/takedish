const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({I}) => {
  // Navigate to favorite restaurant page
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty favorited restaurant', ({I}) => {
  // Favorite restaurant page should show empty restaurant
  I.seeElement('favorite-page');
  I.see('Its empty here...', '.message_content');
});

Scenario('Favoriting one Restaurant', async ({I}) => {
  I.see('Its empty here...', '.message_content');

  // Navigate to homepage
  I.amOnPage('/');

  // Restaurant list should display with the restaurant name
  I.seeElement('.restaurant_name');

  const firstRestaurant = locate('.restaurant_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  // Navigate to first restaurant detail
  I.click(firstRestaurant);

  // Detail page should display
  I.seeElement('detail-page');
  // Fav Button should display
  I.seeElement('#fav-button');
  // Fav Button clicked to favoriting this restaurant
  I.click('#fav-button');

  // After fav button clicked, snackbar should displayed
  I.see('Added to favorites', '#snackbar');

  // Navigate to favorite restaurant list
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant_item');

  const favoritedRestaurantName = await I.grabTextFrom('.restaurant_name');

  // Restaurant name that has been favorited should same.
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});
