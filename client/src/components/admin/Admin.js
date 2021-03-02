import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store/store";
import AddCategory from "./AddCategory";
import AddBook from "./AddBook";
import EditCategory from './EditCategory';
import { loadCategories } from "../../actions/category";
import EditBook from "./EditBook";
import EditProfile from './EditProfile';

const Admin = ({ auth: { isAuthenticated, loading, user }, categories, profile }) => {
  useEffect(() => {
    store.dispatch(loadCategories());
  }, []);

  let options = [];
  let subcategoryOptions = [];
  categories == null
    ? (options = [])
    : categories.map((c) => {
        let obj = { label: c.categoryName, value: c.categoryName };
        options.push(obj);
        if (c.subcategories !== undefined) {
          c.subcategories.map((subc) => {
            let subcategoryObj = { label: subc, value: subc };
            subcategoryOptions = [...subcategoryOptions, subcategoryObj];
          });
        }
      });

      const [renderAddCategory, setRenderAddCategory] = useState(false);
      const [renderAddBook, setRenderAddBook] = useState(false);      
      const [renderEditCategory, setRenderEditCategory] = useState(false);
      const [renderEditBook, setRenderEditBook] = useState(false);
      const [renderEditProfile, setRenderEditProfile] = useState(false);

  if (!loading && !isAuthenticated) {
    return <Redirect to="/login" />;
  } else if (!loading && user.role === "user") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="admin">
        <div className="action-buttons">
          <div onClick={() => setRenderAddCategory(!renderAddCategory)} class="box-1">
            <div class="btn btn-one">
              <span>Add category</span>
            </div>
          </div>
          <div onClick={() => setRenderAddBook(!renderAddBook)} class="box-2">
            <div class="btn btn-one">
              <span>Add book</span>
            </div>
          </div>
          <div onClick={() => setRenderEditCategory(!renderEditCategory)} class="box-3">
            <div class="btn btn-one">
              <span>Edit category</span>
            </div>
          </div>
          <div onClick={() => setRenderEditBook(!renderEditBook)} class="box-4">
            <div class="btn btn-one">
              <span>Edit book</span>
            </div>
          </div>
          <div onClick={() => setRenderEditProfile(!renderEditProfile)} class="box-3">
            <div class="btn btn-one">
              <span>Edit profile</span>
            </div>
          </div>
        </div>

        {renderAddCategory ? <AddCategory categories={categories} options={options} /> : ''}
        {renderAddBook ? <AddBook options={options} categories={categories} /> : ''}
        {renderEditCategory ? <EditCategory categories={categories} /> : ''}
        {renderEditBook ? <EditBook /> : ''}
        {renderEditProfile ? <EditProfile profile={profile} /> : ''}

        

        
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.category.categories,
  profile: state.profile.profile
});

export default connect(mapStateToProps)(Admin);
