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
