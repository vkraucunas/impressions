exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function(table){
    table.increments('id');
    table.integer('restaurant_id');
    table.integer('user_id');
    table.integer('rating');
    table.string('review', 500);
    table.date('review_date');
    table.foreign('restaurant_id').references('restaurants(id)');
    table.foreign('user_id').references('users(id)');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};