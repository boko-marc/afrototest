const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    title : {type:String,required:true},


    message : {type:String,required:true},
    
 
    author :
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   
    
},
{
    timestamps:true,

}
);
module.exports = mongoose.model('Post', PostSchema);


