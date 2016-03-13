var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureFlash: true ,
  failureRedirect: '/'
}), function (req, res, next) {
  console.log('user:', req.user);
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;