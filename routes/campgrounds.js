var express=require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
var middleware=require("../middleware");


// index route
router.get("/",function(req,res){
    console.log(req.user);
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds});   
        }
    });
});

// add new campground
router.post("/",middleware.isLogedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name ,price:price, image:image, description:desc,author:author};
    
    Campground.create(newCampground,function(err,newCreated){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Successfully added a Campground");
            res.redirect("/campgrounds");
        }
    });
});

// show form to create campground
router.get("/new",middleware.isLogedIn,function(req,res){
    res.render("new.ejs");
});

// show info about campground
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,founded){
        if(err){
            console.log(err);
        }else{
            console.log(founded);
            res.render("show",{campground:founded}); 
        }
    });
});

// Edit Campground
router.get("/:id/edit",middleware.checkCampgroundOwnerShip,function(req, res) {
    Campground.findById(req.params.id,function(err,foundedCampground){
        if(err){
            res.redirect("/campgounds");
        }else{
               res.render("edit",{campgournd:foundedCampground}); 
        }
    })
});


// Update campgournd

router.put("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campgournd,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Successfully Updated a Campground");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// Deelete Campgrounds
router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           req.flash("success","Successfully removed a Campground");
           res.redirect("/campgrounds");
       }
   }) 
});


module.exports=router;
