var express = require('express');
var router = express.Router();
var fixDate = require('../lib/fixFunctions');
var validate = require('../lib/validations');


router.get('/restaurants/:id/reviews/new', function(req, res, next) {
    var url_id = req.params.id;
    queries.editRestaurant(url_id)
    .then(function (restaurant) {
        res.render('new_review', {
            title: 'New Review',
            header: 'Leave a Review for '+restaurant[0].name,
            restaurant: restaurant[0],
            date: new Date(),
            restID : req.params.id
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    var rest_id= req.params.id;
    var url_review_id = req.params.review_id;
    queries.editReview(url_review_id)
    .then(function(review) {
        console.log(review);
        review = review[0];
        review.review_date = fixDate(review.review_date);
        res.render('edit_review', {
            title: 'Edit Your Review',
            header: 'Edit Review',
            review: review,
            rest_id: rest_id
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

//++++++++++++POSTS+++++++++++++\\

router.post('/restaurants/:id/reviews', function(req, res, next) {
    validate.userName(req.body.user_name, req.params.id).then(function (data) {
        if (!data) {
            queries.allRatings().insert({restaurant_id: req.params.id, user_name: req.body.user_name, rating: req.body.rating, review: req.body.review, review_date: req.body.review_date})
            .then(function(){
                res.redirect('/restaurants/'+req.params.id);
            })
            .catch(function (err) {
                return next(err);
            });
        } else {
            queries.editRestaurant(req.params.id)
            .then(function (restaurant) {
                res.render('new_review', {
                    title: 'New Review',
                    header: 'Leave a Review for '+restaurant[0].name,
                    restaurant: restaurant[0],
                    date: new Date(),
                    restID : req.params.id,
                    message: data,
                    refill: req.body
                });
            })
            .catch(function (err) {
                return next(err);
            });
        }
    });
});

router.post('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    queries.allRatings().where('id', req.params.review_id).update({restaurant_id: req.params.id, user_name: req.body.user_name, rating: req.body.rating, review: req.body.review, review_date: req.body.review_date})
    .then(function() {
        res.redirect('/restaurants/'+req.params.id);
    })
    .catch(function (err) {
        return next(err);
    });
});

module.exports = router;
