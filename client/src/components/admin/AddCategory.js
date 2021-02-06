import React, { useState } from "react";
import store from "../../store/store";
import MultiSelect from "react-multi-select-component";
import axios from "axios";

import {
  handleAddCategory,
  handleAddSubcategory,
} from "../../actions/category";

const AddCategory = ({ categories, options }) => {
  // TODO: clean code

  const [categ, setCateg] = useState({});
  const [categoryImage, setCategoryImage] = useState();

  const [selected, setSelected] = useState([]);

  const onChangeCategory = (e) => {
    const c = {
      categoryName: e,
      subcategories: [],
    };
    setCateg(c);
  };

  const onChangeCategoryImage = (e) => {
    setCategoryImage(e);
  };

  const submitCategory = () => {
    store.dispatch(handleAddCategory(categ, categoryImage));
    console.log("pushed", categ);
    setCateg({});
  };

  const [subcategory, setSubcategory] = useState();
  const onChangeSubcategory = (e) => {
    setSubcategory(e.target.value);
  };

  const submitSubcategory = (categName) => {
    console.log(categName);
    if (categName.includes(",")) {
      console.log("Warning! Select just one category.");
    } else {
      const cat = categories.filter((c) => categName == c.categoryName);
      const id = cat[0]._id;
      store.dispatch(handleAddSubcategory(id, subcategory));
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    console.log(selectedFile);
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
              onChange={(e) => onChangeCategoryImage(e.target.value)}
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
