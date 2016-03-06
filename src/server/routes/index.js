var express = require('express');
var router = express.Router();
var fixDate = require('./fixFunctions');
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
        console.log(restaurant);
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
            restaurant: restaurant[0]
        });
    })
    .catch(function (err) {
        return next(err);
    });
});

router.get('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    var rest_id= req.params.id;
    var url_review_id = req.params.review_id;
    queries.allRatings().where('id', url_review_id)
    .then(function(review) {
        review.review_date = fixDate(review.review_date);
        console.log(review);
        res.render('edit_review', {
            title: 'Edit Your Review',
            header: 'Edit Review',
            review: review,
            rest_id: rest_id
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

router.post('/restaurants/:id/reviews', function(req, res, next) {
    db.none('INSERT INTO ratings (restaurant_id, user_name, rating, review, review_date) VALUES ($1, $2, $3, $4, $5)', [req.params.id, req.body.user_name, req.body.rating, req.body.review, req.body.review_date])
    .then(function(){
        res.redirect('/restaurants/'+req.params.id)
    })
    .catch(function (err) {
        return next(err);
    });
});

router.post('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    db.none('UPDATE ratings SET (user_name, rating, review, review_date) = ($1, $2, $3, $4) WHERE id = '+req.params.review_id, [req.body.user_name, req.body.rating, req.body.review, req.body.review_date])
    .then(function() {
        res.redirect('/restaurants/'+req.params.id);
    })
    .catch(function (err) {
        return next(err);
    });
});

module.exports = router;
