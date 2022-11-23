import axios from "axios";

export const getRecipes = () => async dispatch => {
    
    try{
        const recipes = await axios.get('http://localhost:3001/recipes')
        console.log('accion get recipes')
        console.log(recipes)
        dispatch( {
            type: 'GET_RECIPES',
            payload: recipes.data,
            loading: false
        })
    }
    catch(e){
        console.log(e)
    }

}

export const getRecipeName = (name) => async dispatch =>{

    try {
        const recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        console.log('accion get match recipes')
        console.log(recipes.data)

     dispatch({
        type: "GET_NAME",
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };


export const getRecipeId = (id) => {
 
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/recipes/${id}`);
       console.log(json.data, 'julio');
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

  
export const getDietTypes = () => async dispatch =>  {
    try {
        const dietTypes = await axios.get(`http://localhost:3001/diets`)
        console.log('accion get diet types')
        console.log(dietTypes.data)
      dispatch({
        type: "GET_DIET_TYPES",
        payload: dietTypes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };


export const createRecipe = (payload) => async dispatch =>  {

    try {
      const response = await axios.post(`http://localhost:3001/recipes`,payload);
      console.log('accion post recipe')
       console.log(response)
      getRecipes();
     dispatch({ 
        type: "POST_RECIPE", 
        payload: response 
    });
    } catch (error) {
      console.log(error);
    }
  };


export const cleanDetail = () => {
  return {
    type: "GET_DETAILS",
    payload: [],
  };
};

export const filterByType = (payload) => {
  return {
    type: "FILTER_TYPES",
    payload,
  };
};

export const orderByName = (payload) => ({
  type: "ORDER_BY_NAME",
  payload,
});
export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload: payload,
    };
}