exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function(table){
    table.increments('id');
    table.integer('restaurant_id');
    table.string('user_name', 20);
    table.integer('rating');
    table.string('review', 500);
    table.date('review_date');
    table.foreign('restaurant_id').references('restaurants(id)');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};