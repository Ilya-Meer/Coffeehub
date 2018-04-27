var express           = require('express');
var router            = express.Router();
var Coffeeshop        = require('../models/coffeeshop');
var Comment           = require('../models/comment');
var middleware        = require('../middleware')


// ========================
    // COMMENTS ROUTES
// ========================

  // NEW COMMENT ROUTE 
  router.get('/coffeeshops/:id/comments/new', middleware.isLoggedIn, function(req, res) {
    Coffeeshop.findById(req.params.id, function(err, coffeeshop) {
      if (err) {
        console.log(err);
      } else {
        res.render('comments/new', {coffeeshop: coffeeshop});
      }
    })
  })
  
    // CREATE COMMENT ROUTE
  router.post('/coffeeshops/:id/comments', middleware.isLoggedIn, function(req, res){
    Coffeeshop.findById(req.params.id, function(err, coffeeshop) {
      if (err) {
        console.log(err);
        res.redirect('/coffeeshops'); 
      } else {
        Comment.create(req.body.comment, function(err, newlyCreated){
          if (err) {
            req.flash("error", "An unexpected error occurred!");
          } else {
            newlyCreated.author.id = req.user._id;
            newlyCreated.author.username = req.user.username;
            newlyCreated.save();
            coffeeshop.comments.push(newlyCreated);
            coffeeshop.save(); 
            req.flash("success", "Comment successfully created!");
            res.redirect('/coffeeshops/' + coffeeshop._id);  
          }
        })
      }
    }) 
  })

  // EDIT ROUTE
  router.get('/coffeeshops/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err || !foundComment) {
        req.flash("error", "Comment not found!")
        res.redirect('back'); 
      } else {
        res.render('comments/edit', {coffeeshop_id: req.params.id, comment: foundComment})
      }
    })
  })


  // UPDATE ROUTE

  router.put('/coffeeshops/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err) {
        res.redirect('/coffeeshops');
      } else {
        res.redirect("/coffeeshops/" + req.params.id);
      }
    })
  })
  
  
  // DESTROY ROUTE

router.delete('/coffeeshops/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment successfully removed!");
      res.redirect("/coffeeshops/" + req.params.id);
    }
  })
})



      

module.exports = router;