var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/restaurant_crud';

var queries = require('../../sql/queries.js');

router.get('/', function(req, res, next) {
    var restaurants = [];
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            return res.status(500).json({status: 'error', message: 'Something bad happened'});
        }
        var qry = 'SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r'
        var query = client.query(qry);

        query.on('row', function(row) {
            restaurants.push(row);
        });

        query.on('end', function(){
            res.render('index', {
                title: "Impressions",
                array: restaurants
            });
            done();
        });

    pg.end();
    });
});


// router.get('/restaurants/:restaurantId', function(req, res, next) {
//   var id = req.params.restaurantId;
//   if(!id) {
//     next();
//     return;
//   }

//   var restaurant;
//   for ( var r in restaurants) {
//     if (restaurants[r].id === Number(id)){
//       restaurant = restaurants[r];
//     }
//   }

//   res.render('show', {
//     title: restaurant.name,
//     header: restaurant.name,
//     restaurant: restaurant
//   });

// });

// router.get('/edit/:restaurantId', function(req, res, next) {
//   var id = req.params.restaurantId;
//   if(!id) {
//     next();
//     return;
//   }

//   var restaurant;
//   for ( var r in restaurants) {
//     if (restaurants[r].id === Number(id)){
//       restaurant = restaurants[r];
//     }
//   }

//   res.render('edit', {
//     title: "Impressions : Edit",
//     header: "Edit "+restaurant.name,
//     restaurant: restaurant
//   });

// });


module.exports = router;
