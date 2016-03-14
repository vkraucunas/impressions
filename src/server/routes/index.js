var express = require('express');
var router = express.Router();
var queries = require('../lib/queries');


router.get('/', function(req, res, next) {

    queries.homepage()
    .then(function(data) {
        if (!req.user) {
            res.render('index', {
                title: 'Impressions',
                array: data.rows
            });
        } else if (req.user.admin) {
            res.render('index', {
                title: 'Impressions',
                array: data.rows,
                user: req.user,
                admin: req.user.admin
            });
        } else {
            res.render('index', {
                title: 'Impressions',
                array: data.rows,
                user: req.user
            });
        }
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id', function(req, res, next) {
    var url_id = req.params.id;
    queries.show(url_id)
    .then(function (restaurant) {
        var restaurant_info = restaurant[0];
        if (!req.user) {
            res.render('show', {
                title: restaurant_info.name,
                header: restaurant_info.name,
                ratings: restaurant.ratings,
                restaurant: restaurant_info
            });
        } else if (req.user.admin) {
            res.render('show', {
                title: restaurant_info.name,
                header: restaurant_info.name,
                ratings: restaurant.ratings,
                restaurant: restaurant_info,
                user: req.user,
                admin: req.user.admin
            });
        } else {
            res.render('show', {
                title: restaurant_info.name,
                header: restaurant_info.name,
                ratings: restaurant.ratings,
                restaurant: restaurant_info,
                user: req.user
            });
        }
    })
    .catch(function (err) {
        return next(err);
    });
});


module.exports = router;
