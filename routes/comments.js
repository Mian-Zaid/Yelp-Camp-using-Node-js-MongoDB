var express=require("express");
var router=express.Router({mergeParams:true});
var middleware=require("../middleware");
var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");

// comment new
router.get("/new",middleware.isLogedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.render("newComment",{camp:camp});
        }
    })
});

// comment create;
router.post("/",middleware.isLogedIn,function(req,res){
    Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{

           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   comment.author.id=req.user._id;
                   comment.author.username=req.user.username;
                   comment.save();
                   
                   camp.comments.push(comment);
                   camp.save();
                   req.flash("success","Successfully added a Comment");
                   res.redirect('/campgrounds/'+camp._id);
               }
           })
        }
    })
});

// Comment Edit
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundedComment) {
       if(err){
           res.redirect("back");
       } else{
           res.render("editComment",{campground_id:req.params.id,comment:foundedComment})
       }
    });
});

// Comment Update
router.put("/:comment_id/",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundedComment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully updated a Comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


// Comment Delete
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success","Successfully removed a Comment");
           res.redirect("/campgrounds/"+req.params.id)
       }
   }) 
});


module.exports=router;