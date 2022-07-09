const jwt = require('jsonwebtoken');
const User = require('../Modeles/users')
require('dotenv').config()
module.exports = async (req,res,next) => {
  if(!req.headers.authorization)
  {
    return res.send({message:"Bearer token is required"})
  }  
  else
  {
    const token = await req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = await decodedToken.userId;
    
        User.findById(userId).then((user) => {
            if(!user) 
            {
                return res.json({message : 'Unauthorized'})
            }
            if(user.role == 1)
            {
                next()
            }
            else 
            {
                return res.json({message : 'Unauthorized'})
            }
        })
       
      }
    }