var express = require('express');
var router = express.Router();
var fixDate = require('./fixFunctions');
var validate = require('./validations');
var queries = require('./queries');

// =========== GETS =================
router.get('/', function(req, res, next) {
    queries.homepage()
    .then(function(data) {
        res.render('index', {
            title: 'Impressions',
            array: data.rows
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/new', function(req, res, next) {
    res.render('new', {
        title: 'Add New Restaurant',
        header: 'Add New Restaurant',
    });
});

router.get('/restaurants/:id', function(req, res, next) {
    var url_id = req.params.id;
    queries.show(url_id)
    .then(function (restaurant) {
        var restaurant_info = restaurant[0];
        res.render('show', {
            title: restaurant_info.name,
            header: restaurant_info.name,
            ratings: restaurant.ratings,
            restaurant: restaurant_info
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id/edit', function(req, res, next) {
    var url_id = req.params.id;
    queries.editRestaurant(url_id)
    .then(function (restaurant) {
        res.render('edit', {
            title: 'Edit '+restaurant[0].name,
            header: 'Edit '+restaurant[0].name,
            restaurant: restaurant[0]
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

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

//+++++++++++++++++++ POSTS +++++++++++++++++++
router.post('/restaurants', function(req, res, next) {
    validate.restaurantName(req.body.name)
    .then(function(data) {
        if (!data) {
            queries.allRestaurants().insert({name: req.body.name, img: req.body.img, food_type: req.body.food_type, city: req.body.city, state: req.body.state, description: req.body.description})
            .then(function() {
                res.redirect('/');
            })
            .catch(function (err) {
                return next(err);
            });
        } else {
            res.render('new', {
                title: 'Add New Restaurant',
                header: 'Add New Restaurant',
                refill: req.body,
                message: data
            });
        }
    })
    .catch(function (err) {
        return next(err);
    });
});

router.post('/restaurants/:id/edit', function(req, res, next) {
    queries.editRestaurant(req.params.id).update({name: req.body.name, img: req.body.img, food_type: req.body.food_type, city: req.body.city, state: req.body.state, description: req.body.description})
    .then(function() {
        res.redirect('/restaurants/'+req.params.id);
    })
    .catch(function (err) {
        return next(err);
    });
});

router.post('/restaurants/:id/delete', function(req, res, next) {
    queries.editRestaurant(req.params.id).del()
    .then(function() {
        res.redirect('/');
    })
    .catch(function (err) {
        return next(err);
    });
});

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
