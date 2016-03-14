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

        var ratingValues = 0;
        for(var i in restaurant.ratings) {
            ratingValues +=restaurant.ratings[i].rating;
        }
        var ratingAvg = ratingValues / restaurant.ratings.length;

        var renderObj = {
            title: restaurant_info.name,
            header: restaurant_info.name,
            ratings: restaurant.ratings,
            restaurant: restaurant_info,
            rating_num: ratingAvg
        };

        if (!req.user) {
            res.render('show', renderObj);
            return;
        }

        renderObj.user = req.user;

        var isAdmin = req.user.admin;
        if (isAdmin) {
            renderObj.admin = true;
        }

        for(var i in restaurant.ratings) {
            var rating = restaurant.ratings[i];
            var isReviewer = rating.user_id == renderObj.user.id;
            if(isAdmin || isReviewer) {
                rating.canEdit = true;
            }

            restaurant.ratings[i] = rating;
        }
        console.log('show: ',renderObj);
        res.render('show', renderObj);
    })
    .catch(function (err) {
        return next(err);
    });
});


module.exports = router;
