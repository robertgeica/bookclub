import axios from "axios";
import {
  CATEGORIES_LOAD,
  CATEGORY_LOAD,
  CATEGORY_LOAD_ERROR,
  ADD_CATEGORY,
  ADD_SUBCATEGORIES,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "./types";

export const loadCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category");

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
      subcategories: newCategory.subcategories,
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

export const handleAddSubcategory = (id, newSubcategory) => async (
  dispatch
) => {
  try {
    const res = await axios.get("/api/category/" + id);

    const categoryObj = {
      ...res.data,
      subcategories: [...res.data.subcategories, newSubcategory],
    };
    console.log(categoryObj);

    await axios.post("/api/category/" + id, categoryObj);
    console.log("added label", res.data);

    const data = await axios.get("/api/category");
    console.log(data);

    dispatch({
      type: ADD_SUBCATEGORIES,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LOAD_ERROR,
    });
  }
};

export const handleDeleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/category/" + id);
    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
    dispatch(loadCategories());
  } catch (error) {
    dispatch({
      type: CATEGORY_LOAD_ERROR,
    });
  }
};

export const handleEditCategory = (
  category,
  updatedCategory,
  categoryImage
) => async (dispatch) => {
  let newCategory = [];
  console.log(updatedCategory, category, categoryImage);

  if (updatedCategory == null) {
    newCategory = {
      ...category,
      categoryImage: categoryImage == undefined ? category.categoryImage : categoryImage,
    };
  } else {
    newCategory = {
      ...updatedCategory,
      categoryImage: categoryImage == undefined ? category.categoryImage : categoryImage,

    };
  }
  console.log(newCategory);

  try {
    const res = await axios.put("/api/category/" + category._id, newCategory);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
    dispatch(loadCategories());
  } catch (error) {
    dispatch({
      type: CATEGORY_LOAD_ERROR,
    });
  }
};

export const handleDeleteSubcategory = (categoryId, subcategoryName) => async (
  dispatch
) => {

  console.log(categoryId, subcategoryName)
  try {
    let data = await axios.get("/api/category/" + categoryId);
    const newSubcategories = data.data.subcategories.filter(subcategory => subcategory !== subcategoryName);
    data.data.subcategories = newSubcategories;

    
    await axios.put("/api/category/" + categoryId, data.data);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: data.data,
    });
    dispatch(loadCategories());

  } catch (error) {
    dispatch({
      type: CATEGORY_LOAD_ERROR,
    });
  }
};
