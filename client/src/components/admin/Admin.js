import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store/store";
import AddCategory from "./AddCategory";
import AddBook from "./AddBook";
import { loadCategories } from "../../actions/category";

const Admin = ({ auth: { isAuthenticated, loading, user }, categories }) => {
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

  if (!loading && !isAuthenticated) {
    return <Redirect to="/login" />;
  } else if (!loading && user.role === "user") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="admin">
        <AddCategory categories={categories} options={options} />

        <AddBook options={options} categories={categories} />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.category.categories,
});

export default connect(mapStateToProps)(Admin);
