var express = require('express');
var router = express.Router();
var knex = require('../../db/knex');

function Restaurants() {
    return knex('restaurants');
}

function Ratings() {
    return knex('ratings');
}

module.exports = {
    homepage: function(req, res){
        return knex.raw('SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r');
    },
    editRestaurant: function(id){
        return Restaurants.where('id', id);
    },
    editReview: function(reviewID){
        return Ratings().where('id', reviewID);
    },
    show: function(brewery_id){
        return Breweries()
            .innerJoin('beers', 'breweries.name', 'beers.brewery')
            .select('breweries.id',
                    'breweries.name as brewery_name',
                    'breweries.city',
                    'breweries.state',
                    'beers.name as beer_name',
                    'beers.id',
                    'beers.abv')
            .where('breweries.id', brewery_id);
    }
};