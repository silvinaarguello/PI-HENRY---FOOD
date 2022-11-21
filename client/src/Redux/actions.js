import axios from 'axios';



//conexion Back y front
export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data,
            loading: false,
        });
}
}
 export function getRecipeName(name){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch({
      type: 'GET_NAME',
      payload: json.data,
                 
    });
  }
}

export function getRecipeId(id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data,
           
        });
    }
}

export function getDietTypes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/diets');
        return dispatch({
            type: 'GET_DIET_TYPES',
            payload: json.data,
           
        });
    }
}

export function createRecipe(payload){
    return async function(dispatch){
            const response = await axios.post('http://localhost:3001/recipes', payload);
            return dispatch({
                type: 'POST_RECIPE',
                payload: response
               
            });
        }
}

export function cleanDetail(){
    return {           
    type: 'CLEAN_DETAILS',
    payload: [],
};
};

export function filterByType (payload){
    return {
        type: 'FILTER_TYPES',
        payload: payload,
    };
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload: payload,
    };
  }

export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload: payload,
    };
}