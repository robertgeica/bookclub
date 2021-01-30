import React, { useState } from "react";
import store from "../../store/store";
import MultiSelect from "react-multi-select-component";

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

  return (
    <div className="category">
      <div className="category-form">
        <form className="form">
          <input
            className="form-field"
            placeholder="category"
            onChange={(e) => onChangeCategory(e.target.value)}
          />
          <input
            id="middle-form-field"
            className="form-field"
            placeholder="image url"
            onChange={(e) => onChangeCategoryImage(e.target.value)}
          />
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
