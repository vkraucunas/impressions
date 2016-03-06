var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var fixDate = require('./fixFunctions');


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
        return knex.raw('SELECT * FROM restaurants WHERE id = '+id).then(function(restaurant) {
            restaurant = restaurant.rows;
            return knex('ratings').where('restaurant_id', id).then(function(ratings) {
                for (var i in ratings) {
                    ratings[i].short_review = ratings[i].review.substring(0, 35);
                    ratings[i].review_date = fixDate(ratings[i].review_date);
                }
                restaurant.ratings = ratings;
                var sum = 0;
                for( var j = 0; j < restaurant.ratings.length; j++ ){
                    sum += parseInt( restaurant.ratings[j], ratings.length );
                }
                restaurant.rating_avg = sum/restaurant.ratings.length;
                return restaurant;
            });
        });
    }
};
