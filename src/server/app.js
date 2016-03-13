// *** main dependencies *** //
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieSession = require('cookie-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var queries = require('./lib/queries');


// *** routes *** //
 var routes = require('./routes/index.js');
 var users = require('./routes/users.js');
 var admin = require('./routes/admin.js');
 var auth = require('./routes/auth.js');

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
app.use(cookieSession({
  name: 'facebook-oauth-session',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',express.static(path.join(__dirname, '../client')));
app.use('/images',express.static(path.join(__dirname, '../img')));

// auth
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_KEY,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, callback) {
    console.log(this);
    queries.users().where('facebook_id', profile.id).then(function(data) {
        if (data.length) {
            return data[0].id;
        } else {

            return queries.users().insert({
              facebook_id: profile.id,
              first_name: profile.name.givenName,
              last_name: profile.name.familyName
            },'id').then(function(id) {
            return id[0];
          });
        }
      }).then(function(user) {
        return callback(null, user);
   });
  }
));

passport.serializeUser(function(user, done) {
  // later this will be where you selectively send to the browser
  // an identifier for your user, like their primary key from the
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(userId, done) {
  // here is where you will go to the database and get the
  // user each time from it's id, after you set up your db

  if ( userId ) {
    queries.users()
      .where({ id: userId })
      .first()
      .then(function (user) {
        ( !user ) ? done() : done(null, user);
      })
      .catch(function (err) {
        done(err, null);
      })
  } else {
    done();
  }
});



// *** main routes *** //
app.use('/', routes);
app.use('/', auth);
app.use('/', users);
app.use('/', admin);


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
