var express           = require('express');
var bodyParser        = require('body-parser');
var passport          = require('passport');
var router            = express.Router();
var middleware        = require('../middleware')

var User              = require('../models/user');

  // LANDING PAGE ROUTE

  router.get('/', function(req, res) {
    res.render("landing");
  })
  
  
  router.get('/register', function(req, res){
    res.render('register');
  })
  
  router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username})
        
    User.register(newUser, req.body.password, function(err, user){
      if(err) {
        req.flash("error", err.message);
        return res.render("register");
      } 
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "You have successfully registered!");
        res.redirect("/coffeeshops");
      })
  
    })
  })
  
  router.get('/login', function(req, res){
    res.render('login');
  })

  router.post('/login', passport.authenticate("local", {
    successRedirect: "/coffeeshops", 
    failureRedirect: "/login"
  }), function(req, res) {
    console.log("You've been redirected!");
  });
        
  router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect('/coffeeshops');
  })
  
module.exports = router;