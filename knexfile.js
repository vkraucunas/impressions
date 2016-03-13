module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/restaurant_crud_knex'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};