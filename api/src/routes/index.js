const { Router } = require('express');
require ('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {API_KEY}=process.env
const { Recipe, Diet } = require('../db');
const { getALLRecipes,getDBrecipesID,getAPIrecipesID, getAllRecipes } = require('../functions/recipe');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes',async  (req,res) =>{
    try {
        const {name} = req.query
        let recipes= await getALLRecipes()
        if (name) {
            let recipeName = await recipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()))
            if (recipeName.length) {
                let filteredName = recipeName.map(e => {
                    return {
                        id: e.id,
                        image: e.image,
                        name: e.name,
                        healthScore: e.healthScore,
                        diets: (typeof(e.diets[0])==='string')? e.diets : e.diets.map(e => e.name),
                        
                    }
                })
                return res.status(200).json(filteredName)
            }
            return res.status(404).json("recipes not found")
        }else{
            let filterAllRecipes = recipes.map(e => {
                return {
                    id: e.id,
                    image: e.image,
                    name: e.name,
                    healthScore: e.healthScore,
                    diets: (typeof(e.diets[0])==='string')? e.diets : e.diets.map(e => e.name),
                    
                }
            })
            return res.json(filterAllRecipes)
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
})
router.get('/recipes/:idRecipe', async (req,res) =>{
    try {
        const {idRecipe}=req.params
        if (idRecipe.length===36) {
            let DBrecipe = await getDBrecipesID(idRecipe)
            DBrecipe = {
                id: DBrecipe.id,
                name: DBrecipe.name,
                summary: DBrecipe.summary,
                healthScore: DBrecipe.healthScore,
                steps: DBrecipe.steps,
                image: DBrecipe.image,
                dishTypes: DBrecipe.dishTypes,
                diets: DBrecipe.diets.map(e => e.name),

            } 
            if (DBrecipe) return res.json(DBrecipe)
        }else{
            let APIrecipe = await getAPIrecipesID(idRecipe)
            if (APIrecipe.data.id) {
                let APIdata = {
                    name: APIrecipe.data.title,
                    image: APIrecipe.data.image,
                    dishTypes: APIrecipe.data.dishTypes,
                    healthScore: APIrecipe.data.healthScore,
                    summary: APIrecipe.data.summary,
                    diets: APIrecipe.data.diets,
                    steps: APIrecipe.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.json(APIdata)
            }
        }
        throw new Error
    } catch (error) {
        res.status(404).json('recipe not found by id')
    }
})

router.get('/diets', async (req,res) => {
    let types = [
        "gluten free",
        "Ketogenic",
        "vegetarian",
        "lacto-vegetarian",
        "Ovo-Vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "Low FODMAP",
        "whole 30"
    ]
    types.forEach(e=> {
        Diet.findOrCreate({
            where: { name: e }
        })
    });
    let dietTypes = await Diet.findAll()
    return res.send(dietTypes)
})
router.post('/recipes', async  (req,res) => {
    try {
        const {name,summary,healthScore,steps,diets,image} = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image
            
        })
        
        let dietTypes = await Diet.findAll({
            where: { name: diets} 
        })
        await newRecipe.addDiet(dietTypes)
        return res.send(newRecipe)
    } catch (error) {
        return res.status(400).send(error.message)
    }
    console.log(body);
})



module.exports = router;
