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

router.get('/new', function(req, res, next) {
    var restaurants = [];
    res.render('new', {
        title: 'Add New Restaurant',
        header: 'Add New Restaurant',
    })

});

router.get('/restaurants/:restaurantId/edit', function(req, res, next) {
  var uriId = req.params.restaurantId;
  console.log('get');
  if(!uriId) {
    next();
    return;
  }
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
        done();
        return res.status(500).json({status: 'error', message: 'Something bad happened'});
    }
        var qry = 'SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r WHERE r.id =' + uriId;
        var query = client.query(qry);
        console.log("Query string is", qry);
        query.on('row', function(row) {
            var restaurant = row;
            restaurant.ratings = [];

            var ratingsQry = 'SELECT * FROM ratings WHERE restaurant_id='+uriId;
            var query2 = client.query(ratingsQry);

            query2.on('row', function(row) {
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                row.review_date = new Intl.DateTimeFormat('en-US', options).format(row.review_date);
                row.short_review = row.review.substring(0, 35);
                console.log(row.review_date);

                restaurant.ratings.push(row);
            });
            query2.on('end', function() {
                var ratingsObj = restaurant.ratings;
                console.log(ratingsObj.review_date);

                res.render('edit', {
                    title: restaurant.name,
                    header: restaurant.name,
                    ratings: restaurant.ratings,
                    restaurant: restaurant
                });
                done();
            });
        });
    pg.end();
  });
});


router.get('/restaurants/:restaurantId', function(req, res, next) {
  var uriId = req.params.restaurantId;
  if(!uriId) {
    next();
    return;
  }
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            return res.status(500).json({status: 'error', message: 'Something bad happened'});
        }
        var qry = 'SELECT r.*, (SELECT ROUND(AVG(rating)) FROM ratings WHERE restaurant_id = r.id) as rating from restaurants r WHERE r.id =' + uriId;
        var query = client.query(qry);
        console.log("Query string is", qry);
        query.on('row', function(row) {
            var restaurant = row;
            restaurant.ratings = [];

            var ratingsQry = 'SELECT * FROM ratings WHERE restaurant_id='+uriId;
            var query2 = client.query(ratingsQry);

            query2.on('row', function(row) {
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                row.review_date = new Intl.DateTimeFormat('en-US', options).format(row.review_date);
                row.short_review = row.review.substring(0, 35);
                console.log(row.review_date);

                restaurant.ratings.push(row);
            });
            query2.on('end', function() {
                var ratingsObj = restaurant.ratings;
                console.log(ratingsObj.review_date);

                res.render('show', {
                    title: restaurant.name,
                    header: restaurant.name,
                    ratings: restaurant.ratings,
                    restaurant: restaurant
                });
                done();
            });
        });
    pg.end();
    });
});

router.post('/restaurants/:restaurantId', function(req, res, next) {
  var uriId = req.params.restaurantId;
  if(!uriId) {
    next();
    return;
  }
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            return res.status(500).json({status: 'error', message: 'Something bad happened'});
        }
        var qry = 'DELETE FROM restaurants WHERE id =' + uriId;
        var query = client.query(qry);
        query.on('end', function(row) {
            res.redirect('/');
            done();
        });
    pg.end();
    });
});

router.post('/restaurants/:restaurantId/edit', function(req, res, next) {
    console.log(req.body);
    var input = req.body;
    pg.connect(connectionString, function(err, client, done) {

      if(err) {

        res.status(500).json({status: 'error', message: 'Something bad happened'});
                done();
      }
      var qury="UPDATE restaurants SET (name, city, state, food_type, description) = ('"+[input.name.text(),input.city,input.state,input.food_type,input.description].join("','")+"') WHERE id =" +req.params.restaurantId +";";
      console.log(qury);
      var query = client.query(qury);
      query.on('end', function() {
        res.redirect('/restaurants/'+req.params.restaurantId);
        done();
      })
      // query.on('end', function(){
      //   res.render('show', {
      //       title: restaurant.name,
      //       header: restaurant.name,
      //       ratings: restaurant.ratings,
      //       restaurant: restaurant
      //   });
      //   done();
      // });
      // close the connection
      pg.end();
    });
});


module.exports = router;
