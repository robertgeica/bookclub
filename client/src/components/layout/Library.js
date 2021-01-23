import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store/store";

import { loadCategories } from "../../actions/category";

const Library = ({ categories }) => {
  useEffect(() => {
    store.dispatch(loadCategories());
  }, []);



  console.log(categories);
  return (
    <div className="library">
      {categories == null ? '' :
        <div className="library-categories">
          <p>Categorii</p>
          <ul className="categories-list">
            {categories.map(c => (
              <Link to={`/library/category/${c.categoryName}`}>
                {c.categoryName}
              </Link>
            ))}
          </ul>
        </div>

      }
    </div>

  );
}

const mapStateToProps = (state) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps)(Library);