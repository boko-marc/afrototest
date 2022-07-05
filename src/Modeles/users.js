const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
// role = 0:user role = 1 :admin

const UserSchema = mongoose.Schema({
    name : {type:String,required:true, unique:true},

    email : {type:String,required:true,unique:true},

    password:{type:String,
        required:true},

    birthdate : {
        type:Date,required:true
    },  
    bio :
    {
        type: String, required:true
    },
 
    role: {
        type: String,
        enum : [0,1],
        default: 0
    },
    
},
{
    timestamps:true,

}
);
UserSchema.plugin(uniqueValidator);
// hash password where is update or create new user
UserSchema.pre("save", function(next) {
    if (this.isModified("password") || this.isNew()) {
     this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
   });

// function to compare password hashed with password plaintext   
UserSchema.methods.comparePassword = function(plaintext)
{
    return bcrypt.compareSync(plaintext,this.password)
}
module.exports = mongoose.model('User', UserSchema);


