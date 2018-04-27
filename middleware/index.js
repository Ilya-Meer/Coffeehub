var Coffeeshop                = require('../models/coffeeshop'),
    Comment                   = require('../models/comment');

var middlewareObj = {
  checkShopOwnership: function(req, res, next) {
    if (req.isAuthenticated()) {
      Coffeeshop.findById(req.params.id, function(err, coffeeshop){
        if (err || !coffeeshop) {
          req.flash("error", "An unexpected error occurred!");
          res.redirect('back');
        } else { 
          if(coffeeshop.author.id.equals(req.user._id)) {
            next();
            // res.render('coffeeshops/edit', {coffeeshop: coffeeshop});
          } else {
            req.flash("error", "You do not have permission to do that!");
            res.redirect('back');
          }
        }
      })
    } else {
      req.flash("error", "You need to be logged in to do that!");
      res.redirect('back');
    }
  }, 
  checkCommentOwnership: function(req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, comment){
        if (err || !comment ) {
          req.flash("error", "An unexpected error occurred!");
          res.redirect('back');
        } else {
          if(comment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You do not have permission to do that!");
            res.redirect('back');
          }
        }
      })
    } else {
      req.flash("error", "You need to be logged in to do that!");
      res.redirect('back');
    }
  }, 
  isLoggedIn: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect('/login');
  }
}


module.exports = middlewareObj;

