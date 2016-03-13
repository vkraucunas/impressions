
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
        facebook_id: 'abc',
        first_name: 'Xander',
        last_name: 'Swift',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'bcd',
        first_name: 'Kaia',
        last_name: 'Fer',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'cde',
        first_name: 'Coy',
        last_name: 'Fay',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'def',
        first_name: 'Alize',
        last_name: 'Black',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'efg',
        first_name: 'Naomie',
        last_name: 'Jones',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'fgh',
        first_name: 'Hodor',
        last_name: 'Hodor',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'ghi',
        first_name: 'Ramiro',
        last_name: 'Nadet',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'hij',
        first_name: 'Marcelino',
        last_name: 'Pagac',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'ijk',
        first_name: 'Scotty',
        last_name: 'Cronin',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'jkl',
        first_name: 'Erin',
        last_name: 'Henn',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'klm',
        first_name: 'Bryana',
        last_name: 'Weimann',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'lmn',
        first_name: 'Edwin',
        last_name: 'Schinn',
        password: 'stuff'
    }),
    knex('users').insert({
        facebook_id: 'mno',
        first_name: 'Val',
        last_name: 'Vitkus',
        password: 'passing',
        admin: true
    })
  );
};
