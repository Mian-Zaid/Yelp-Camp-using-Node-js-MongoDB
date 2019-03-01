var mongoose=require("mongoose");
var campground=require("./models/campgrounds.js");
var Comment=require("./models/comment.js");

var data=[
    {
        name:"i dont know",
        image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Apartments simplicity or understood do it we. Song such eyes had and off. Removed winding ask explain delight out few behaved lasting. Letters old hastily ham sending not sex chamber because present. Oh is indeed twenty entire figure. Occasional diminution announcing new now literature terminated. Really regard excuse off ten pulled. Lady am room head so lady four or eyes an. He do of consulted sometimes concluded mr. An household behaviour if pretended. "
    },
    {
        name:"i dont know",
        image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Apartments simplicity or understood do it we. Song such eyes had and off. Removed winding ask explain delight out few behaved lasting. Letters old hastily ham sending not sex chamber because present. Oh is indeed twenty entire figure. Occasional diminution announcing new now literature terminated. Really regard excuse off ten pulled. Lady am room head so lady four or eyes an. He do of consulted sometimes concluded mr. An household behaviour if pretended. "
    },
    {
        name:"i dont know",
        image:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Apartments simplicity or understood do it we. Song such eyes had and off. Removed winding ask explain delight out few behaved lasting. Letters old hastily ham sending not sex chamber because present. Oh is indeed twenty entire figure. Occasional diminution announcing new now literature terminated. Really regard excuse off ten pulled. Lady am room head so lady four or eyes an. He do of consulted sometimes concluded mr. An household behaviour if pretended. "
    }
    
];

function seedsDB(){
    campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Removed");
        }
        
        
        data.forEach(function(seed){
            campground.create(seed,function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added ");
                    Comment.create(
                        {
                            text:"this is boring",
                            author:"mian"
                        },function(err,comment){
                            if(err){
                                console.log("err");
                            }else{
                                data.comments.push(comment);
                                data.save();
                                console.log("added coment");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports=seedsDB;