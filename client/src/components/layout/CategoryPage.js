import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import store from "../../store/store";
import { loadData, loadBook } from "../../actions/book";
import { loadCategory } from "../../actions/category";

const CategoryPage = (props) => {
  const categoryId = props.match.params.id;
  const books = props.data;
  const category = props.category;

  useEffect(() => {
    store.dispatch(loadData());
    store.dispatch(loadCategory(categoryId));
  }, []);

  let booksArr = [];
  books == null
    ? (booksArr = [])
    : books.map((book) => {
        book.category.map((bookCategory) => {
          if (bookCategory.categoryId == categoryId) {
            booksArr.push(book);
          }
        });
      });

  console.log("books from this category", booksArr);
  return (
    <div className="category-container">
      {category !== undefined && category !== null ? (
        <div className="category">

          <div className="library-categories">
            <p>Subcategorii</p>
            <ul className="categories-list">
              {category.subcategories.map((subcategory) => (
                <Link to={`/`}>{subcategory}</Link>
              ))}
            </ul>
          </div>

          <p>{category.categoryName} <span>({booksArr.length})</span></p>
          <div className="books">
            {booksArr.map((book) => (
              <div className="book">
                <Link
                  to={`/library/book/${book._id}`}
                  onClick={() => store.dispatch(loadBook(book._id))}
                >
                  <img src={book.imageUrl} />
                </Link>
                <Link
                  className="titlu"
                  to={`/library/book/${book._id}`}
                  onClick={() => store.dispatch(loadBook(book._id))}
                >
                  {book.title}
                </Link>
                <p id="autor">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.book.data,
  category: state.category.category,
});

export default connect(mapStateToProps)(CategoryPage);
