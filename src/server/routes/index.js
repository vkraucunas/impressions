var express = require('express');
var router = express.Router();
var fixDate = require('./fixFunctions');

var options = {};
var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/restaurant_crud';
var db = pgp(connectionString);

// =========== GETS =================
router.get('/', function(req, res, next) {
    db.any('SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r')
    .then(function(data) {
        res.render('index', {
            title: 'Impressions',
            array: data
        })
    })
    .catch(function (err) {
        return next(err);
    });
});


router.get('/new', function(req, res, next) {
    res.render('new', {
        title: 'Add New Restaurant',
        header: 'Add New Restaurant',
    })
});

router.get('/restaurants/:id', function(req, res, next) {
    var url_id = req.params.id;
    db.one('SELECT * FROM restaurants WHERE id = ' + url_id)
    .then(function (restaurant) {
        var id = restaurant.id;
        return db.any('SELECT * FROM ratings WHERE restaurant_id = ' + id)
          .then(function(ratings) {
            for (i in ratings) {
                ratings[i].short_review = ratings[i].review.substring(0, 35);
                ratings[i].review_date = fixDate(ratings[i].review_date);
            }
            restaurant.ratings = ratings;
            var sum = 0;
            for( var i = 0; i < restaurant.ratings.length; i++ ){
                sum += parseInt( restaurant.ratings[i], ratings.length );
                }
            restaurant.rating_avg = sum/restaurant.ratings.length;
            return restaurant;
          });
    })
    .then(function (restaurant) {
        res.render('show', {
            title: restaurant.name,
            header: restaurant.name,
            ratings: restaurant.ratings,
            restaurant: restaurant
        })
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id/edit', function(req, res, next) {
    var url_id = req.params.id;
    db.one('SELECT * FROM restaurants WHERE id = ' + url_id)
    .then(function (restaurant) {
        res.render('edit', {
            title: 'Edit '+restaurant.name,
            header: 'Edit '+restaurant.name,
            restaurant: restaurant
        })
    })
    .catch(function (err) {
        return next(err);
    });
})

router.get('/restaurants/:id/reviews/new', function(req, res, next) {
    var url_id = req.params.id;
    db.one('SELECT id, name FROM restaurants WHERE id = ' + url_id)
    .then(function (restaurant) {
        res.render('new_review', {
            title: 'New Review',
            header: 'Leave a Review for '+restaurant.name,
            restaurant: restaurant
        })
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    var url_id = req.params.review_id;
    db.one('SELECT * FROM ratings WHERE id ='+url_id)
    .then(function(review) {
        review.review_date = fixDate(review.review_date);
        res.render('edit_review', {
            title: 'Edit Your Review',
            header: 'Edit Review',
            review: review
        })
    })
    .catch(function (err) {
        return next(err);
    });
})

//+++++++++++++++++++ POSTS +++++++++++++++++++
router.post('/restaurants', function(req, res, next) {
    console.log(req.body);
    db.none('INSERT INTO restaurants (name, img, food_type, city, state, description) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.name, req.body.img, req.body.food_type, req.body.city, req.body.state, req.body.description])
    .then(function() {
        res.redirect('/');
    })
    .catch(function (err) {
        return next(err);
    });
});

router.post('/restaurants/:id/edit', function(req, res, next) {
    db.none('UPDATE restaurants SET (name, city, state, food_type, description) = ($1, $2, $3, $4, $5) WHERE id = '+req.params.id, [req.body.name, req.body.city, req.body.state, req.body.food_type, req.body.description])
    .then(function() {
        res.redirect('/restaurants/'+req.params.id);
    })
    .catch(function (err) {
        return next(err);
    });
});


router.post('/restaurants/:id/delete', function(req, res, next) {
    db.none('DELETE FROM restaurants WHERE id = '+req.params.id)
    .then(function() {
        res.redirect('/');
    })
    .catch(function (err) {
        return next(err);
    });
});




module.exports = router;
