const db = require('../db');
require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipe,Diet} = require('../db');


const getAPIrecipes = async  () =>{
    let apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    let apiInfo = await apiURL.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            dishTypes: e.dishTypes,
            healthScore: e.healthScore,
            summary: e.summary,
            diets: e.diets,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    return apiInfo
}

const getDBrecipes = async  () =>{
    let recipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }})
    return recipes
}

const getAPIrecipesID = async  (idRecipe) =>{
    return await axios.get(`https://api.spoonacular.com/recipes/${parseInt(idRecipe)}/information?apiKey=${API_KEY}`)
}

const getDBrecipesID = async  (id) =>{
    let recipe = await Recipe.findByPk(id, {
        include: {
            model:Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return recipe
}

const getALLRecipes = async  () => {
    const APIrecipes = await getAPIrecipes() 
    const DBrecipes = await getDBrecipes()
    let recipes=[]
    if (APIrecipes) recipes=recipes.concat(APIrecipes)
    if (DBrecipes) recipes=recipes.concat(DBrecipes)
    return recipes
}

module.exports = {
    getAPIrecipes,
    getDBrecipes,
    getAPIrecipesID,
    getDBrecipesID,
    getALLRecipes
}