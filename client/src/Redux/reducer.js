const initialState ={
    allRecipes: [],
    showedRecipes:[],
    diets:[],
    recipeDetail: [],
    isLoading: true,


}
function rootReducer (state = initialState, action) {
    switch(action.type){
        case 'GET_RECIPES':
            return {
               ...state,
               showedRecipes: action.payload,
                allRecipes: action.payload,
                isLoading: action.loading,
            };
            case 'GET_NAME':
                return{
                    ...state,
                    showedRecipes: action.payload,
                };

            case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload,
                };
            case 'GET_DIETS_TYPES':
                return{
                    ...state,
                    diets: action.payload,
                };
            case 'POST_RECIPE':
                return{
                   ...state,
                };
            case 'FILTER_TYPES':
                const allDiets = state.allRecipes;
                const filterTypes =
                  action.payload === "all"
                    ? allDiets
                    : allDiets.filter((e) => e.status === action.payload);
                return {
                  ...state,
                  showedRecipes: filterTypes,
                };
                                         
            case 'ORDER_BY_NAME':
            const orderName = action.payload === 'all' ? state.allRecipes
            : action.payload === 'asc' 
            ?state.showedRecipes.sort((a,b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());            
            })
            : state.showedRecipes.sort((a,b) => {            
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());            
            });
            return{
                ...state,
                showedRecipes: orderName,
            };

            case 'ORDER_BY_SCORE':
                const orderScore = action.payload === 'all'? state.allRecipes
            : action.payload === 'hight'
            ? state.showedRecipes.sort((a,b) => b.score - a.score)
            : state.showedRecipes.sort((a,b) => a.score - b.score);
            return{
                ...state,
                showedRecipes: orderScore,
            };
            
            default:
                return {...state,}
}
}

export default rootReducer;