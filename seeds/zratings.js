
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('ratings').del(),

    // Inserts seed entries
    knex('ratings').insert({
        restaurant_id: 1,
        user_id: 1,
        rating: 5,
        review:'I love cheese, especially caerphilly taleggio. Who moved my cheese bocconcini st. agur blue cheese cheeseburger croque monsieur macaroni cheese fromage edam. Manchego cheese strings stilton pecorino cottage cheese taleggio say cheese cheese slices. Paneer mozzarella blue castello stinking bishop brie st.',
        review_date: 'July 20, 2014'
    }),
    knex('ratings').insert({
        restaurant_id: 1,
        user_id: 2,
        rating: 5,
        review: 'I love cheese, especially lancashire st. agur blue cheese. Pecorino jarlsberg cow rubber cheese cheddar stinking bishop fromage who moved my cheese.',
        review_date: 'January 23, 2015'
    }),
    knex('ratings').insert({
        restaurant_id: 2,
        user_id: 3,
        rating: 4,
        review: 'I love cheese, especially cheesy feet cheesy feet. Smelly cheese cheeseburger chalk and cheese mascarpone the big cheese say cheese pepper jack emmental. Squirty cheese manchego edam bocconcini cheddar pecorino monterey jack red leicester.',
        review_date: 'May 5, 2013'
    }),
    knex('ratings').insert({
        restaurant_id: 2,
        user_id: 4,
        rating: 1,
        review: 'Oh, yes, that stupid plastic container I asked you to buy. You see, hydrofluoric acid will not eat through plastic. It will, however, dissolve me',
        review_date: 'March 30, 2015'
    }),
    knex('ratings').insert({
        restaurant_id: 3,
        user_id: 5,
        rating: 4,
        review: 'I love cheese, especially pecorino say cheese. Lancashire gouda gouda squirty cheese red leicester cheese slices cheeseburger fromage frais. Goat red leicester cheese on toast dolcelatte mozzarella pecorino cheese slices the big cheese. Goat say cheese cream cheese cheddar cheese strings cottage cheese hard cheese lancashire. Taleggio halloumi queso roquefort the big cheese lancashire cheeseburger chalk and cheese.',
        review_date: 'April 28, 2015'
    }),
    knex('ratings').insert({
        restaurant_id: 3,
        user_id: 6,
        rating: 3,
        review: 'Hodor! Hodor hodor, hodor hodor, hodor, hodor hodor. Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor? Hodor hodor - hodor... Hodor hodor hodor... Hodor hodor hodor?! Hodor, hodor. Hodor. Hodor, hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor; hodor hodor; hodor hodor?!',
        review_date: 'December 18, 2014'
    }),
    knex('ratings').insert({
        restaurant_id: 4,
        user_id: 7,
        rating: 1,
        review: 'Last month he is the freak with jicama breath who waxes his back. No need, little lady, your tears of gratitude are enough for me. Welcome to the future, where cars fly, robots serve our every whim, and genetically engineered dinosaurs rule the Earth. I do not buckle.',
        review_date: 'October 14, 2015'
    }),
    knex('ratings').insert({
        restaurant_id: 4,
        user_id: 8,
        rating: 3,
        review: 'I love cheese, especially halloumi stinking bishop. Babybel pecorino melted cheese cheese slices jarlsberg cheese triangles bavarian bergkase babybel. Airedale roquefort manchego melted cheese camembert de normandie mascarpone parmesan parmesan. Cheese and biscuits taleggio goat bocconcini cut the cheese queso swiss stinking bishop. Fromage fromage frais port-salut edam cheese on toast cheese and biscuits pepper jack squirty cheese.',
        review_date: 'June 21, 2014'
    }),
    knex('ratings').insert({
        restaurant_id: 5,
        user_id: 9,
        rating: 1,
        review: 'No speeches. Short speech. You lost your partner today. What is his name - Emilio? Emilio is going to prison. The DEA took all your money, your lab. You got nothing. Square one. But you know the business and I know the chemistry. I am thinking... maybe you and I could partner up. I am sorry, what were you asking me? Oh, yes, that stupid plastic container I asked you to buy. You see, hydrofluoric acid will not eat through plastic. It will, however, dissolve me',
        review_date: 'June 3, 2015'
    }),
    knex('ratings').insert({
        restaurant_id: 5,
        user_id: 10,
        rating: 4,
        review: 'I love cheese, especially halloumi stinking bishop. Babybel pecorino melted cheese cheese slices jarlsberg cheese triangles bavarian bergkase babybel. Airedale roquefort manchego melted cheese camembert de normandie mascarpone parmesan parmesan. Cheese and biscuits taleggio goat bocconcini cut the cheese queso swiss stinking bishop.',
        review_date: 'March 25, 2014'
    }),
    knex('ratings').insert({
        restaurant_id: 6,
        user_id: 11,
        rating: 5,
        review: 'I love cheese, especially lancashire st. agur blue cheese. Pecorino jarlsberg cow rubber cheese cheddar stinking bishop fromage who moved my cheese. Cheese and wine brie cheese and wine stinking bishop halloumi edam stilton smelly cheese. Ricotta fromage smelly cheese bocconcini macaroni cheese cheese on toast cheese on toast rubber cheese. Everyone loves fromage brie pecorino queso cheesecake melted cheese camembert de normandie. Stinking bishop dolcelatte cheese on toast say cheese.',
        review_date: 'October 29, 2014'
    }),
    knex('ratings').insert({
        restaurant_id: 6,
        user_id: 12,
        rating: 3,
        review: 'I am a comfortador also. Last month he is the freak with jicama breath who waxes his back. No need, little lady, your tears of gratitude are enough for me. Welcome to the future, where cars fly, robots serve our every whim, and genetically engineered dinosaurs rule the Earth. I do not buckle. Occasionally I swashbuckle. Looking in windows, knocking on doors. I do not think Buffy is going to be too broken up over a pylon.',
        review_date: 'February 15, 2016'
    })
  );
};
