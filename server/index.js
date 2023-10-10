import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./route/userRoute.js"
import { recipeRouter } from "./route/recipe.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors({
  origin: [" http://localhost:5174", "https://recipe-app-client-zqc3.onrender.com"]
}))
app.use("/auth", router)
app.use("/recipes", recipeRouter)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECT)
    console.log("MongoDB is connected", conn.connection.host)
  } catch (error) {
    console.log(error, "cannot connect")
  }
}

app.get("/", (req, res) => {
  res.json("Humble welcome to you")
})


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("SERVER IS STARTED AT PORT", PORT)
  })
}).catch(err => {
  console.log(err)
})