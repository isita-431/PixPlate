const express = require("express");
const Recipe = require("../database/models/recipe.modal");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post('/recipe', auth, async (req, res) => {
    try{
        const recipe = new Recipe({ ...req.body });
        const savedRecipe = await recipe.save();
        req.user.recipes.push(savedRecipe._id);
        await req.user.save();

        res.status(201).send({
            success: true,
            message: "Successfully saved a recipe",
            recipe: recipe,
          });
    }catch(error){
        res.status(400).send({
            success: false,
            message: error.message,
          });
    }
})

router.get('/recipes', auth, async (req, res) => {
    try{
        await req.user.populate('recipes')

        res.send({
            success: true,
            recipes: req.user.recipes 
        })
    }catch(error){
        res.send({
            success: false,
            recipies: []
        })
    }
})

router.delete('/recipe', auth, async (req, res) => {
    try{
        console.log(req.body)
        req.user.recipes = req.user.recipes.filter(id => id.toString() !== req.body.recipe._id);
        await req.user.save()

        await Recipe.findByIdAndDelete(req.body.recipe._id);

        res.send({
            success: true,
            message: "Successfully Deleted"
        })
    }catch(error){
        console.log(req.body)
        console.log(error.message)
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router