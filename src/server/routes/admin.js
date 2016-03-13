var express = require('express');
var router = express.Router();
var fixDate = require('./fixFunctions');
var validate = require('./validations');

router.get('/new', function(req, res, next) {
    res.render('new', {
        title: 'Add New Restaurant',
        header: 'Add New Restaurant',
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

//++++++++++++POSTS+++++++++++++\\


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

module.exports = router;
