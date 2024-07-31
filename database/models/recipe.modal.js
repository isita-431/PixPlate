const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    incredients: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
