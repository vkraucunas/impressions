// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

//data dependencies
var restaurants = require('./data').restaurants;

// *** routes *** //
 var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, '../client')));
// app.use('/show/', express.static(path.join(__dirname, '../client/pages')));
app.use('/images',express.static(path.join(__dirname, '../img')));


// *** main routes *** //
// app.use('/', routes);
app.get('/', function(req, res, next) {
  res.render('index', {
    title: "Impressions",
    array: restaurants
  });
});

app.get('/show/:restaurantId', function(req, res, next) {
  //console.log(req);
  var id = req.params.restaurantId;
  if(!id) {
    next();
    return;
  }

  var restaurant;
  for ( var r in restaurants) {
    if (restaurants[r].id === Number(id)){
      restaurant = restaurants[r];
    }
  }

  res.render('show', {
    title: "Impressions : Show",
    header: restaurant.name,
    restaurant: restaurant
  });

});

app.get('/edit/:restaurantId', function(req, res, next) {
  var id = req.params.restaurantId;
  if(!id) {
    next();
    return;
  }

  var restaurant;
  for ( var r in restaurants) {
    if (restaurants[r].id === Number(id)){
      restaurant = restaurants[r];
    }
  }

  res.render('edit', {
    title: "Impressions : Edit",
    header: "Edit "+restaurant.name,
    restaurant: restaurant
  });

});







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000, function () {
    console.log('App listening on port ' + 3000);
});

module.exports = app;
