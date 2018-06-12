var mongoose = require('mongoose');
var Coffeeshop = require('./models/coffeeshop');
var Comment = require('./models/comment');

var data = [
  {
    name: "Prado Coffee", 
    image:  "https://reflectingvancouver.files.wordpress.com/2015/05/vancouver-spring-2015-038.jpg", 
    description: "At Prado Cafe we’re about two simple things; crafting the perfect brew & creating a great atmosphere. Founded in 2004 and taken over in 2011 by Sammy Piccolo, (four-time Canadian Barista Champion, first ever winner of the World Latte Art Championships, winner at the Coffee Fest Latte Art Championship, and four-time top three placement for Canada at the World Barista Championships) his passion for coffee is evident. Proudly serving 49th Parallel Coffee Roasters, Sammy has made every effort to bring an enhanced coffee experience to his cafes, training partners on measuring and weighing each dose for consistency to create that perfect cup of coffee."
  },
  {
    name: "Tim Horton's", 
    image:  "http://foodology.ca/wp-content/uploads/2011/08/cs-outer.jpg", 
    description: "Classic Canadian Coffee."
  }
]


function seedDB() {
  // REMOVE ALL COFFEESHOPS
  Coffeeshop.remove({}, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log("coffeeshops have been removed."); 
      data.forEach(function(coffeeshop){
        Coffeeshop.create(coffeeshop, function(err, shop) {
          if (err) {
            console.log(err);
          } else {
            console.log(shop);
            Comment.create({
              text: 'This place is pretty awesome, I higly recommend the latte!', 
              author: 'Sample McSampleson'
            }, function(err, comment){
                if (err) {
                  console.log(err);
                } else {
                  shop.comments.push(comment);
                  shop.save();
                  console.log("Created a new comment!")
                }
            })
          }
        })
      })
    }
  })
}

module.exports = seedDB;