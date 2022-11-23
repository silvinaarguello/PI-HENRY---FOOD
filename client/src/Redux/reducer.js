const initialState ={
    allRecipes: [],
    showedRecipes:[],
    diets:[],
    detail: [],
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

            case 'GET_DETAILS':
                return{
                    ...state,
                    detail: action.payload
                    
                };
                
            case 'GET_DIET_TYPES':
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
                    : allDiets.filter((r) => r.diets.includes(action.payload));
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
            //     const orderScore = action.payload === 'all'? state.allRecipes
            // : action.payload === 'hight'
            // ? state.showedRecipes.sort((a,b) => b.score - a.score)
            // : state.showedRecipes.sort((a,b) => a.score - b.score);
            // return{
            //     ...state,
            //     showedRecipes: orderScore,
            // };
            let sortedArrayPop = action.payload === 'high' ? state.allRecipes.sort(function (a,b){
                if(a.score < b.score) {
                    return -1;
                }
                if(a.score > b.score) {
                    return 1;
                }
                return 0;
            }) :
            state.allRecipes.sort(function(a,b){
                if(a.score > b.score) {
                    return -1;
                }
                if(b.score > a.score) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allRecipes:sortedArrayPop
            }

            default:
                return {...state,}
}
}

export default rootReducer;