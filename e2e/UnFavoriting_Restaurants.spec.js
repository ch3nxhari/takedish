const assert = require('assert');

Feature('UnFavoriting Restaurants');

let firstRestaurantName;

Before(async ({I}) => {
  // Navigate to homepage
  I.amOnPage('/');

  // Restaurant list should display with their own names
  I.seeElement('.restaurant_name');
  const firstRestaurant = locate('.restaurant_name').first();
  firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  // Navigate to first restaurant detail
  I.click(firstRestaurant);

  // Fav Button should display
  I.seeElement('#fav-button');

  // Clicked fav button to favoriting its restaurant
  I.click('#fav-button');

  // Navigate to favorite restaurant page
  I.amOnPage('/#/favorite');
});

Scenario('Showing favorited restaurant', async ({I}) => {
  I.seeElement('favorite-page');
  const favoritedRestaurantName = await I.grabTextFrom('.restaurant_name');

  // Restaurant name that has been favorited should same.
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('Unfavoriting a restaurant', ({I}) => {
  I.seeElement('.restaurant_name');

  // Navigate to first restaurant detail
  I.click(locate('.restaurant_name').first());

  // Fav Button should display
  I.seeElement('#fav-button');
  // Fav Button clicked to unfavoriting this restaurant
  I.click('#fav-button');

  // After unfavorited button clicked, snackbar should displayed
  I.see('Removed from favorites', '#snackbar');

  // Navigate to favorite restaurant page
  I.amOnPage('/#/favorite');

  // Favorite restaurant page should show empty restaurant
  I.seeElement('favorite-page');
  I.see('Its empty here...', '.message_content');
});
