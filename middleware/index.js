var Campground=require("../models/campgrounds");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.isLogedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to Loged In to do that");
    res.redirect("/login");
}
middlewareObj.checkCampgroundOwnerShip=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundedCampground) {
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }
            else{
                if(foundedCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You need to Looged In to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnerShip=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundedComment) {
            if(err){
                req.flash("error","Comment not found");
                res.redirect("back");
            }
            else{
                if(foundedComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error","You need to Looged In to do that");
        res.redirect("back");
    }
}

module.exports=middlewareObj;