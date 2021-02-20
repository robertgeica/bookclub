import { CATEGORIES_LOAD, CATEGORY_LOAD, CATEGORY_LOAD_ERROR, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, ADD_SUBCATEGORIES } from '../actions/types';
  
  const initialState = {
    categories: null,
    category: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CATEGORIES_LOAD:
      case ADD_CATEGORY:
      case ADD_SUBCATEGORIES:
        return { categories: payload };

      case DELETE_CATEGORY:
      case UPDATE_CATEGORY:
        return {...state, payload}
      
        case CATEGORY_LOAD:
        return { ...state, category: payload };
      
      case CATEGORY_LOAD_ERROR:
        return { ...state };
  
      default:
        return state;
    }
  }