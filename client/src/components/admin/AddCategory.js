import React, { useState } from "react";
import store from "../../store/store";
import MultiSelect from "react-multi-select-component";
import axios from "axios";

import {
  handleAddCategory,
  handleAddSubcategory,
} from "../../actions/category";

const AddCategory = ({ categories, options }) => {

  const [category, setCategory] = useState({});
  const [categoryImage, setCategoryImage] = useState();
  const [selected, setSelected] = useState([]);

  const onChangeCategory = (e) => {
    const category = {
      categoryName: e,
      subcategories: [],
    };
    setCategory(category);
  };

  const onChangeCategoryImage = (e) => {
    setCategoryImage(e);
  };

  const submitCategory = () => {
    store.dispatch(handleAddCategory(category, categoryImage));
    // console.log("pushed", category);
    setCategory({});
  };

  const [subcategory, setSubcategory] = useState();
  const onChangeSubcategory = (e) => {
    setSubcategory(e.target.value);
  };

  const submitSubcategory = (categoryName) => {
    // console.log(categoryName);
    if (categoryName.includes(",")) {
      console.log("Warning! Select just one category.");
    } else {
      const cat = categories.filter((category) => categoryName == category.categoryName);
      const id = cat[0]._id;
      store.dispatch(handleAddSubcategory(id, subcategory));
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    onChangeCategoryImage(e.target.files[0].name);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    // console.log(selectedFile);
    formData.append("file", selectedFile, selectedFile.name);

    await axios.post("api/fileupload", formData);
  };

  return (
    <div className="category">
      <div className="category-form">
        <form className="form">
          <input
            className="form-field"
            placeholder="category"
            onChange={(e) => onChangeCategory(e.target.value)}
          />

          <div className="inp">
            <label htmlFor="categFile" className="btn select">
              Select Cover
            </label>
            <input
              id="categFile"
              onChange={(e) => onFileChange(e)}
              className=" hide"
              type="file"
            />
            <input
              className="form-field upload"
              name="imageUrl"
              placeholder={selectedFile == null ? "" : selectedFile.name}
              defaultValue={selectedFile == null ? "" : selectedFile.name}
              id="middle-form-field"
              //onChange={(e) => onChangeCategoryImage(e.target.value)}
            />
            <span className="btn" onClick={onFileUpload}>
              Upload
            </span>
          </div>

          <button type="button" className="btn" onClick={submitCategory}>
            Add category
          </button>
        </form>
      </div>

      <div className="subcategory-form">
        <div>
          <MultiSelect
            name="category"
            className="dropdown"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy={"Select"}
            hasSelectAll={false}
            focusSearchOnOpen={true}
          />
        </div>

        <div className="inp">
          <input
            className="form-field"
            placeholder="subcategory"
            name="subcategory"
            onChange={(e) => onChangeSubcategory(e)}
          />
          <button
            className="btn"
            onClick={(e) =>
              submitSubcategory(
                e.target.parentNode.parentNode.childNodes[0].childNodes[0]
                  .childNodes[0].childNodes[0].childNodes[0].childNodes[0]
                  .textContent
              )
            }
          >
            Add subcategory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
