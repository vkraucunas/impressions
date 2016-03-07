var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var fixDate = require('./fixFunctions');


function Restaurants() {
    return knex('restaurants');
}

function getRestarantById(id){
    return knex('restaurants').where('id',id);
}

function getRatingsByRestarantId(id){
    return knex('ratings').where('restaurant_id',id);
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
        return getRestarantById(id);
    },
    editReview: function(reviewID){
        return Ratings().where('id', reviewID);
    },
    show: function(id){
        return getRestarantById(id).then(function(restaurant) {
            return getRatingsByRestarantId(id).then(function(ratings) {
                for (var i in ratings) {
                    ratings[i].short_review = ratings[i].review.substring(0, 35);
                    ratings[i].review_date = fixDate(ratings[i].review_date);
                }
                restaurant.ratings = ratings;
                return restaurant;
            });
        });
    }
};
