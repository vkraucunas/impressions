
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('restaurants').del(),

    // Inserts seed entries
    knex('restaurants').insert({
        name: 'Phomiliar',
        img: '../images/pho1.jpg',
        food_type: 'Vietnamese',
        city: 'Austin',
        state: 'TX',
        description: 'Award winning food and Pho soup are sure to satisfy all of the Pho-natics and first-timers alike. Don&#39;t take our word for it... Stop by one of their two locations!'
    }),
    knex('restaurants').insert({
        name: 'Mucha Muchacha&#39;s',
        img: '../images/mexican.jpg',
        food_type: 'Mexican',
        city: 'Phoenix',
        state: 'AZ',
        description: 'Known for wacky creations. You could also order breakfast tacos stuffed with eggs, mashed potatoes and avocado.'
    }),
    knex('restaurants').insert({
        name: 'Green Bridge',
        img: '../images/steak.jpg',
        food_type: 'American',
        city: 'Decatur',
        state: 'NE',
        description: 'The Green Bridge is a local landmark. Established in 1956 which burnt down in 1998 and Rebuilt by a group of investors to open in 1999. Come on in for some popcorn shrimp and a Shirley Temple!'
    }),
    knex('restaurants').insert({
        name: 'Dundee&#39;s',
        img: '../images/pub.jpg',
        food_type: 'Pub',
        city: 'Charlotte',
        state: 'SC',
        description: 'World famous Fish n Chips, Reuben sandwich, and Single Malt Scotch Wall! Bring family & friends for some good food, an array of beverages, and quirky people.'
    }),
    knex('restaurants').insert({
        name: 'Greenhouse',
        img: '../images/salad.jpg',
        food_type: 'Vegetarian',
        city: 'Portland',
        state: 'OR',
        description: 'A Portland favorite for vegan comfort food since 1998! Be sure to try the sweet potato fries with banana ketchup!'
    }),
    knex('restaurants').insert({
        name: 'Low Country',
        img: '../images/boil.jpg',
        food_type: 'Cajun',
        city: 'Jackson',
        state: 'MS',
        description: 'Always seasoned just right, the crawfish is always fresh.  Ask for a side of butter, obviously.'
    })
  );
};
