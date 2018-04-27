var express           = require('express');
var router            = express.Router();
var Coffeeshop        = require('../models/coffeeshop');
var middleware        = require('../middleware');
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// INDEX ROUTE (RESTFUL CONVENTION) --> SHOWS ALL COFFEESHOPS
router.get('/coffeeshops', function(req, res) {
  Coffeeshop.find({}, function(err, allCoffeeshops) {
    if (err) {
      console.log(err);
    } else {
      res.render("coffeeshops/index", {coffeeshops: allCoffeeshops});
    }
  })
})


// NEW ROUTE (RESTFUL CONVENTION) --> ALLOWS US TO CREATE A NEW ROUTE
router.get('/coffeeshops/new', middleware.isLoggedIn, function(req, res){
res.render("coffeeshops/new");
})


// CREATE ROUTE (RESTFUL CONVENTION) --> CREATES A NEW COFFEESHOP
router.post('/coffeeshops', middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id, 
    username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
  var lat = data[0].latitude;
  var lng = data[0].longitude;
  var location = data[0].formattedAddress;
  var newShop = {name: name, image: image, description: description, author: author, location: location, lat: lat, lng: lng};
    Coffeeshop.create(newShop, function(err, newlyCreated){
      if (err) {
        req.flash("error", "An unexpeced error occurred!");
      } else {
        req.flash("success", "Coffeeshop successfully created!");
        res.redirect('/coffeeshops');
      }
    })
  })
})



// SHOW ROUTE (RESTFUL CONVENTION) --> SHOWS MORE INFORMATION ABOUT ANY ONE SINGLE COFFEESHOP

router.get('/coffeeshops/:id', function(req, res){
// res.send("This will be the show page one day!");
Coffeeshop.findById(req.params.id).populate("comments").exec(function(err, foundShop){
  if (err || !foundShop) {
    req.flash("error", "Coffeeshop not found!");
    res.redirect("/coffeeshops");
  } else {
    res.render('coffeeshops/show', {coffeeshop: foundShop});
  }
})
})

  // EDIT ROUTE

router.get('/coffeeshops/:id/edit', middleware.checkShopOwnership, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, coffeeshop){
    if (err) {
      res.redirect('/coffeeshops');
    } else {
      res.render('coffeeshops/edit', {coffeeshop: coffeeshop});
    } 
  })
})

  // UPDATE ROUTE 

router.put('/coffeeshops/:id', middleware.checkShopOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.coffeeshop.lat = data[0].latitude;
    req.body.coffeeshop.lng = data[0].longitude;
    req.body.coffeeshop.location = data[0].formattedAddress;

    Coffeeshop.findByIdAndUpdate(req.params.id, req.body.coffeeshop, function(err, updatedShop){
      if(err) {
        res.redirect('/coffeeshops');
      } else {
        res.redirect("/coffeeshops/" + req.params.id);
      }
    })
  })
})


  // DESTROY ROUTE

router.delete('/coffeeshops/:id', middleware.checkShopOwnership, function(req, res){
  Coffeeshop.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect("/coffeeshops");
    } else {
      req.flash("success", "Coffeeshop successfully removed!");
      res.redirect("/coffeeshops");
    }
  })
})

module.exports = router;