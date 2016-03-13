exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('facebook_id').unique();
    table.string('first_name');
    table.string('last_name')
    table.string('password', 30).default('');
    table.boolean('admin').default(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};