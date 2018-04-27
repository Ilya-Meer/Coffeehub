var express           = require('express');
var bodyParser        = require('body-parser');
var passport          = require('passport');
var router            = express.Router();
var middleware        = require('../middleware')

var User              = require('../models/user');

  // LANDING PAGE ROUTE

  router.get('/', function(req, res) {
    res.render("landing");
    // res.send('hello from the root of app.js in coffeehub');
  })
  
  
  router.get('/register', function(req, res){
    res.render('register');
  })
  
  router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username})
        // THE LINE BELOW BASICALLY REGISTERS A NEW USER AND THEN PROCEEDS TO LOG HIM OR HER IN. 
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
                              // THIS PASSPORT.AUTHENTICATE IS THE SAME ONE AS IN THE REGISTER ROUTE, BUT THIS ONE DEALS DIRECTLY WITH 
                              //     WHAT HAPPENS WHEN A USER IS NOT REGISTERED, THAT'S WHY IT LOOKS DIFFERENT
  router.post('/login', passport.authenticate("local", {
    successRedirect: "/coffeeshops", 
    failureRedirect: "/login"
  }), function(req, res) {
       // THIS DOESN'T REALLY DO ANYTHING AND WE CAN GET RID OF IT IF WE WANT TO, BUT IT'S HERE JUST SO THAT WE KNOW WHERE THE CALLBACK GOES.
  });
        
  router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect('/coffeeshops');
  })
  
module.exports = router;