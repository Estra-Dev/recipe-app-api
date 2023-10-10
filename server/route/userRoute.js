import express from "express"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"
const router = express.Router()
 

const SECRET = 

router.post("/register", async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({ username })

  if (user) {
    res.json({message: "user already exist"})
  }else {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username,
      password: hashedPassword
    })
    
    console.log(newUser)
  
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username
      })
    }
    res.json({message: "User registered successfully"})
  }
})
router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({ username })

  if (!user) {
    res.json({message: "User Doesn't exist"})
  }

  const isPassOk = await bcrypt.compare(password, user.password)
  console.log(isPassOk)
  
  if (!isPassOk) {
    res.json({message: "Username or Password is not correct"})
  }

  const token = Jwt.sign({id: user._id}, process.env.SECRET)
  res.json({token, userID: user._id, username})

})


 export default router

 export const verify = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    Jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        res.sendStatus(403)
      }
      next()
    })
  }else{
    res.sendStatus(401)
  }
 }