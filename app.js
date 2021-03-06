require('dotenv').config();

var express                   = require('express'),
    bodyParser                = require('body-parser'),
    mongoose                  = require('mongoose'),
    passport                  = require("passport"),
    flash                     = require("connect-flash"),
    localStrategy             = require("passport-local"),
    passportLocalMongoose     = require("passport-local-mongoose"),
    methodOverride            = require("method-override"),
    Coffeeshop                = require('./models/coffeeshop'),
    Comment                   = require('./models/comment'),
    User                      = require('./models/user'),
    // seedDB                    = require('./seeds'),     <--- ENABLE THIS FOR SAMPLE DATA
    middleware                = require('./middleware')
    app                       = express();


  // ROUTE REQUIRE STATEMENTS
var coffeeshopRoutes = require('./routes/coffeeshops'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes      = require('./routes/index');


  // APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/coffeehub";
mongoose.connect(url);

app.use(express.static('public'));
app.use(methodOverride("_method")); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.set("view engine", "ejs");


  // seedDB();   <--- ENABLE THIS FOR SAMPLE DATA


  // PASSPORT AUTHENTICATION CONFIG
app.use(require("express-session")({
  secret: "Hello from the other side",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  // CURRENT USER MIDDLEWARE

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

  // ROUTES

app.use(indexRoutes);
app.use(commentRoutes);
app.use(coffeeshopRoutes);


var port = process.env.PORT || 3015;

app.listen(port, function(){
  console.log("Coffeehub is up!");
})


