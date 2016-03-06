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
    allRestaurants: function() {
        return Restaurants();
    },
    allRatings: function() {
        return Ratings();
    },
    homepage: function(req, res){
        return knex.raw('SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r');
    },
    editRestaurant: function(id){
        return Restaurants.where('id', id);
    },
    editReview: function(reviewID){
        return Ratings().where('id', reviewID);
    },
    show: function(id){
        return Restaurants()
            .innerJoin('ratings', 'restaurants.id', 'ratings.restuarant_id')
            .select()
            .where('restaurants.id', id);
    }
};