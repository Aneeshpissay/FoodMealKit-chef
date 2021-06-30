
let BASE_URL = '';
if(process.env.NODE_ENV === 'development') {
    BASE_URL = '';
}
else {
    BASE_URL = 'https://food-meal-kit-api.herokuapp.com'
}

export const ALL_INGREDIENTS = `${BASE_URL}/allIngredients`;
export const VEGETABLES = `${BASE_URL}/vegetables`;
export const FRUITS = `${BASE_URL}/fruits`;
export const CREATE_RECIPE = `${BASE_URL}/create/recipe`;
export const GET_RECIPE = `${BASE_URL}/recipe`;
export const RECIPE_BY_ID = (id) =>  `${BASE_URL}/recipe/${id}`;