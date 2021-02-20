import React, { useState } from "react";
import axios from "axios";
import store from "../../store/store";

import {
  handleDeleteCategory,
  handleEditCategory,
  handleDeleteSubcategory,
} from "../../actions/category";

const EditCategory = (props) => {
  const categories = props.categories;
  const [renderEdit, setRenderEdit] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryImage, setCategoryImage] = useState();

  const onChangeCategory = (e, subcategories) => {
    const category = {
      categoryName: e,
      subcategories: subcategories,
    };
    setNewCategory(category);
  };

  const onChangeCategoryImage = (e) => {
    setCategoryImage(e);
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    onChangeCategoryImage(e.target.files[0].name);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    await axios.post("api/fileupload", formData);
  };

  return (
    <div className="edit-category">
      {categories.map((category) => (
        <div className="category-box" key={category._id}>
          <img src={category.categoryImage} alt="category image" />

          <div className="row">
            <h2>{category.categoryName}</h2>

            <div className="action-buttons">
              <button
                className="btn edit"
                onClick={() => setRenderEdit(!renderEdit)}
              >
                Edit
              </button>
              <button
                className="btn delete"
                onClick={() =>
                  store.dispatch(handleDeleteCategory(category._id))
                }
              >
                Delete
              </button>
            </div>
          </div>

          {renderEdit ? (
            <div className="category-form">
              <form className="form">
                <input
                  className="form-field"
                  placeholder="category name"
                  onChange={(e) =>
                    onChangeCategory(e.target.value, category.subcategories)
                  }
                  defaultValue={category.categoryName}
                />

                <div className="inp">
                  <label htmlFor={category._id} className="btn select">
                    Select Cover
                  </label>
                  <input
                    id={category._id}
                    onChange={(e) => onFileChange(e)}
                    className=" hide"
                    type="file"
                  />
                  <input
                    className="form-field upload middle-form-field"
                    name="imageUrl"
                    placeholder={
                      selectedFile == null
                        ? category.categoryImage
                        : selectedFile.name
                    }
                    defaultValue={
                      selectedFile == null
                        ? category.categoryImage
                        : selectedFile.name
                    }
                  />
                  <span className="btn" onClick={onFileUpload}>
                    Upload
                  </span>
                </div>

                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    store.dispatch(
                      handleEditCategory(category, newCategory, categoryImage)
                    )
                  }
                >
                  Update category
                </button>
              </form>
            </div>
          ) : (
            ""
          )}

          <h2>Subcategories</h2>
          {category.subcategories.map((subcategory) => (
            <div className="subcategory-box">
              <p>{subcategory}</p>
              <button
                className="btn"
                onClick={() =>
                  store.dispatch(
                    handleDeleteSubcategory(category._id, subcategory)
                  )
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EditCategory;
