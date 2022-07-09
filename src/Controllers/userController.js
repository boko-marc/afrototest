const User = require('../Modeles/users');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

// dotenv package to acces environment variables
require('dotenv').config()

// verify request email format
function verifemail (str) {
    const filter =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (!filter.test(str)) {
      return false
    }
  }
  // create user account ,paasword will be automaticaly hashed 
exports.register = (req,res,next) => {
    try {
        // verify request body
    
        if(!req.body.name || !req.body.email || !req.body.birthdate || !req.body.bio || ! req.body.password)
        {
            return res.status(400).json({
                message: 'Name, Bio,Password, email and birthdate are required'
            })
        }
       if(verifemail(req.body.email) == false)
       {
            return res.json({message : 'Email format is incorrect'})
       }
        // verify is email is already use
        User.findOne({email: req.body.email}).then((user) => {
            if(!user)
            {
                const register = new User({
                    name: req.body.name,
                    bio: req.body.bio,
                    email:req.body.email,
                    password:req.body.password,
                    birthdate:req.body.birthdate,
                    role:req.body.role
                });
                register.save().then((user) => { 
                  return   res.status(201).json({message:'User create succefuly',user:user, succes:true,status:201})} )
                
            }
            else {
                return res.json({message:'This email is taken', succes:false})
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }

}
 
exports.login = (req,res,next) => {
     // verify request body
     if(!req.body.email && !req.body.birthdate)
     {
         return res.status(400).json({
             message: 'Password and email are required'
         })
     }
    //  verify user account
     User.findOne({email: req.body.email}).then((user) => {
        if(!user)
        {
            return res.status(401).json({message:'User account informations are incorrect',succes:false}) 
        }
        // compare request password with comparePassword method in user model
        const match = user.comparePassword(req.body.password)
        if(!match)
        {
            return res.json({message: 'Password forgot?'})
        }
        // encode user id with jwt
        return res.status(200).json({
            user,
            status:200,
            succes:true,
            userId : user._id,
            token : jwt.sign(
                {userId : user._id},
                process.env.SECRET_TOKEN,
                {expiresIn: process.env.TIME}
            )
        })
     }).catch(error => res.status(500).json({error}))
}
// get user by id
exports.getUser = (req,res,next) => {
    User.findById(req.params.id).then((user) => {
        if(!user) {
            return res.status(401).json({message : 'User not found', status:401,succes:false})
        }
        return res.status(200).json({user, status:200,succes:true})
    })
}
// update user account informations(only admin can update user with the role)
exports.updateUser = (req,res,next) => {
            // verify request body
    if(!req.body.name || !req.body.email || !req.body.birthdate || !req.body.bio || ! req.body.password)
    {
        return res.status(400).json({
            message: 'Name, Bio,Password, email and birthdate are required'
        })
    }
    if(verifemail(req.body.email) == false)
    {
         return res.json({message : 'Email format is incorrect'})
    }
    // who want modify account?
    User.findById(req.auth.userId).then(user=> {
        if(user.role == 1)
        {
            if(req.body.role !=0 || req.body.role != 0)
            {
                return res.json({message:'role must be 0 or 1'})
            }
        
            User.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                bio: req.body.bio,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,12),
                birthdate:req.body.birthdate,
                role:req.body.role             
            }, { new:true}).then(user => {
                 if(!user) 
                 {
                     return res.status(401).json({message :'User not found',status:401,succes:false})
                 }
                 return res.status(200).json({message:'Informations update succefuly',user, status:200, succes:true})
             }).catch(error => res.status(500).json({error})) 
         
        }
        else 
        {
            User.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                bio: req.body.bio,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,12),
                birthdate:req.body.birthdate,             
            }, { new:true}).then(user_update => {
                 if(!user_update) 
                 {
                     return res.status(401).json({message :'User not found',status:401,succes:false})
                 }
                 return res.status(200).json({message:'Informations update succefuly',user_update, status:200, succes:true})
             }).catch(error => res.status(500).json({error})) 

        }
    })
   
}
   
// get all users
exports.getAllUsers = (req,res, next) => {
    User.find().then((user) => {
        return res.status(200).json({user,message:'All users'})
    })
}   

// delete user account
exports.deleteUser = (req,res,next) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if(!user) {
            return res.status(401).json({message : 'User not found', status:401,succes:false})
        }
        return res.status(200).json({message: `User ${user._id} account delete`, status:200,succes:true})
    })
}