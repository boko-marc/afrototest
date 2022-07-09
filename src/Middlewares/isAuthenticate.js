const jwt = require('jsonwebtoken');
const User = require('../Modeles/users');
const isAdmin = require('./isAdmin');
require('dotenv').config()
module.exports = async (req,res,next) => {
    // verify token in request header
  if(!req.headers.authorization)
  {
    return res.send({message:"Bearer token is required"})
  }  
  else
  {
    //decode token in request header
    const token = await req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = await decodedToken.userId;  
    // store userId in req.auth.userId,
    req.auth={userId}
    if(req.body.author || req.params.id || req.query.author)
      {
        if (req.params.id === userId || req.body.author === userId || req.query.author === userId)
         {
            next();
         } 
        else 
          {
            User.findById(userId).then((user) => {
              if(!user) 
              {
                  return res.json({message : 'Unauthorizd'})
              }
              else 
              {
                // if is admin?
                  if(user.role == 1)
                  {
                      next();
                  }
                  // is not isAdmin, unauthorized
                  else {
                      return res.json({message: 'Unauthorized'})
                  }
              }
          })         
         } 
        }
        else 
          {
            return res.status(401).json({error:'User id is required!',succes:false,status:401});
          }
        }
}



          