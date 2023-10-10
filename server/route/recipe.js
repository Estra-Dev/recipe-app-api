import { RecipeModel } from "../model/recipe.js";
import express from "express"
import { User } from "../model/userModel.js";
import { verify } from "./userRoute.js";
const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({}).sort({createdAt: -1})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

router.post("/", verify, async (req, res) => {
  const recipe = new RecipeModel({...req.body})
  try {
    const response = await recipe.save()
    res.json(response)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
});


router.put("/", verify, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId)
    const user = await User.findById(req.body.userId)
    
    user.saveRecipes.push(recipe)
    await user.save()
    res.json({saveRecipes: user?.saveRecipes})
  } catch (error) {
    res.json(error)
  }
})

router.get("/savedrecipes/id/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json({savedRecipes: user?.saveRecipes})
  } catch (error) {
    res.json(error)
  }
})


router.get("/savedrecipes/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const savedRecipes = await RecipeModel.find({
      _id: {$in: user.saveRecipes}
    })
    res.json({savedRecipes})
  } catch (error) {
    res.json(error)
  }
})


export {router as recipeRouter}