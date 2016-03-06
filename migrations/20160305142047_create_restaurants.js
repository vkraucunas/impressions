exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
    table.increments('id');
    table.string('name', 40);
    table.string('img');
    table.string('food_type');
    table.string('city');
    table.string('state');
    table.string('description', 250);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};