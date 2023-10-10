import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true  
  },
  password: {
    type: String,
    required: true
  },
  saveRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }]
})

export const User = model("User", userSchema)