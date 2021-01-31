import axios from 'axios';
import { CATEGORIES_LOAD, CATEGORY_LOAD, CATEGORY_LOAD_ERROR, ADD_CATEGORY, ADD_SUBCATEGORIES } from './types';

export const loadCategories = () => async (dispatch) => {
    try {
      const res = await axios.get('/api/category');
  
      dispatch({
        type: CATEGORIES_LOAD,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LOAD_ERROR,
      });
    }
  };
  
  export const loadCategory = (id) => async (dispatch) => {
    try {
      const res = await axios.get("/api/category/" + id);
  
      dispatch({
        type: CATEGORY_LOAD,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LOAD_ERROR,
      });
    }
  };
  
  export const handleAddCategory = (newCategory, image) => async (dispatch) => {
    try {
      const res = await axios.get("/api/category");
  
      const categoryObj = {
        categoryName: newCategory.categoryName,
        categoryImage: image,
        subcategories: newCategory.subcategories
      };
      console.log(image, categoryObj);
  
      await axios.post("/api/category", categoryObj);
      const newData = [...res.data, categoryObj];
  
      dispatch({
        type: ADD_CATEGORY,
        payload: newData,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LOAD_ERROR,
      });
    }
  };
  
  export const handleAddSubcategory = (id, newSubcategory) => async dispatch => {
    try {
      const res = await axios.get('/api/category/' + id);
  
      const categoryObj = {
        ...res.data,
        subcategories: [...res.data.subcategories, newSubcategory]
      };
      console.log(categoryObj);
  
      await axios.post('/api/category/' + id, categoryObj);
      console.log('added label', res.data);
  
      const data = await axios.get('/api/category');
      console.log(data);
  
      dispatch({
        type: ADD_SUBCATEGORIES,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_LOAD_ERROR
      })
    }
  }