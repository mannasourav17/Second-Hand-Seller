import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
const protect = asyncHandler(async (req, res, next) => {
  let token
  console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //here all information except password of user has been set to req.user that is decoded from token
      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin=(req,res,next)=>{
  if(req.user && req.user.isAdmin){
    next()
  }else{
  res.status(401)
  throw new Error('Not authorized as an admin')
  }
}

export { protect,admin }
