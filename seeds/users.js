
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
        user_name: 'Xander_Swift',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Kaia95',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Coy_Fay59',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Alize74',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Naomie4',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Hodor',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Ramiro_Nader86',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Marcelino_Pagac',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Scotty_Cronin93',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Erin31',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Bryana_Weimann',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'Edwin.Schinner6',
        password: 'stuff'
    }),
    knex('users').insert({
        user_name: 'VJK',
        password: 'passing',
        admin: true
    })
  );
};
