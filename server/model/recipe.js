import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  userOwner:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
})


export const RecipeModel = model("Recipe", recipeSchema)