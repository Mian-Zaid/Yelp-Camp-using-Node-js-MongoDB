var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campgrounds");
var seedsDB=require("./seeds");
var Comment=require("./models/comment");
var User=require("./models/user");
var methodOverride=require("method-override");
var flash=require("connect-flash");

var passport=require("passport");
var localStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");


var commentRoutes=require("./routes/comments.js");
var campgroundRoutes=require("./routes/campgrounds.js");
var indexRoutes=require("./routes/index.js");

// ====================
// PASSPORT CONFIGRATION
// ====================
app.use(flash());
app.use(require("express-session")({
    secret:"this is my secret",
    resave:false,
    saveUninitialized:false
    
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();  
});


app.use(express.static(__dirname+"/public"));   
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extented:true}));
app.use(methodOverride("_method"));

// seedsDB();  //seed daatbase

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp camp server started");
});