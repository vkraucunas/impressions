exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('user_name', 20).unique();
    table.string('password', 30);
    table.boolean('admin').default(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};