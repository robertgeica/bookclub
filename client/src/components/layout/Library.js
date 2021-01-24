import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store/store";

import { loadData, loadBook } from "../../actions/book";
import { loadCategories } from "../../actions/category";

const Library = ({ data, categories }) => {
  useEffect(() => {
    store.dispatch(loadData());
    store.dispatch(loadCategories());
  }, []);

  return (
    <div className="library">
      {categories == null ? (
        ""
      ) : (
        <Fragment>
          <div className="library-categories">
            <p>Categorii</p>
            <ul className="categories-list">
              {categories.map((categ) => (
                <Link to={`/library/category/${categ.categoryName}`}>
                  {categ.categoryName}
                </Link>
              ))}
            </ul>
          </div>

          <div className="library-books">
            {categories.map((categ) => (
              <Fragment>
                <div className="category-row">
                  <div className="category-name">
                    <Link
                      className="category"
                      to={`/library/category/${categ.categoryName}`}
                    >
                      {categ.categoryName}
                    </Link>

                    <Link
                      className="category"
                      to={`/library/category/${categ.categoryName}`}
                    >
                      Vezi mai multe
                    </Link>
                  </div>

                  <div className="books-row">
                    {data.data !== null && data.data !== undefined ? (
                      data.data.map((book) => {
                        let flag = false;

                        book.category.map((c) => {
                          c.categoryId == categ._id
                            ? (flag = true)
                            : (flag = false);
                        });

                        if (flag)
                          return (
                            <div className="book">
                              <Link
                                to={`/library/book/${book._id}`}
                                onClick={() =>
                                  store.dispatch(loadBook(book._id))
                                }
                              >
                                <img src={book.imageUrl} />
                              </Link>
                              <Link
                                className="titlu"
                                to={`/library/book/${book._id}`}
                                onClick={() =>
                                  store.dispatch(loadBook(book._id))
                                }
                              >
                                {book.title}
                              </Link>
                              <p id="autor">{book.author}</p>
                            </div>
                          );
                      })
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.book,
  categories: state.category.categories,
});

export default connect(mapStateToProps)(Library);
