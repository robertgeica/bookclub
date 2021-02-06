import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { connect } from "react-redux";
import store from "../../store/store";
import { loadBook, handleUpdateRating } from "../../actions/book";

// import ReadBook from "../book/ReadBook";

const BookPage = (props) => {
  const book = props.book;
  const bookId = props.match.params.id;
  useEffect(() => {
    store.dispatch(loadBook(bookId));
    console.log("usef");
  }, []);

  const onRatingChange = (newRating) => {
    console.log(newRating);
    store.dispatch(handleUpdateRating(bookId, newRating));
  };

  const [isReading, setIsReading] = useState(false);
  const onChangeReading = () => {
    setIsReading(!isReading);
  };

  // console.log(book.rating)
  if (book == null) {
    return 0;
  } else {
    return (
      <Fragment>
        <div className="book-page">
          <div className="top">
            <div className="img-container">
              <img src={book == null ? "" : book.imageUrl} alt="cover" />
            </div>
            <div className="book-container">
              <div className="book-info">
                <h1>{book == undefined ? null : book.title}</h1>
                by <a href="#">{book == undefined ? null : book.author}</a>
                <ReactStars
                  count={10}
                  value={book.rating}
                  onChange={onRatingChange}
                  size={24}
                  className="rating"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>

              <div className="book-stats">
                <div>
                  <span>Pages</span>
                  <p>{book == undefined ? null : book.pages}</p>
                </div>

                <div>
                  <span>Format</span>
                  <p>{book == undefined ? null : book.format}</p>
                </div>

                <div>
                  <span>Language</span>
                  <p>{book == undefined ? null : book.language}</p>
                </div>
              </div>

              <div className="book-id">
                <p id={book == undefined ? null : book.isbn}>ISBN</p>
                <p id={book == undefined ? null : book._id}>ID</p>
              </div>

              <div className="buttons">
                <button id="btn1">Am citit</button>
                <button id="btn2">Wishlist</button>
                <button onClick={onChangeReading} id="btn3">
                  Citeste
                </button>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="descriere">
              <p>{book == undefined ? null : book.description}</p>
            </div>

            <div className="subcategories">
              {book.subcategories.map((sc) => (
                <Link className="titlu" to={`/library/book/${sc}`}>
                  {sc}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};
const mapStateToProps = (state) => ({
  book: state.book.currentBook,
});

export default connect(mapStateToProps)(BookPage);

/*


<div className="book-page">
  <div className="book">
    <div className="img-container">
      <img src={book == null ? "" : book.imageUrl} alt="cover" />
    </div>

      <div className="book-info">
        <h1>{book == undefined ? null : book.title}</h1>
        <p className="autor">
          carte scrisa de{" "}
          <a href="#">{book == undefined ? null : book.author}</a>
        </p>
        <ReactStars
          count={10}
          value={book.rating}
          onChange={onRatingChange}
          size={24}
          className="rating"
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />

        <p className="descriere">
          {book == undefined ? null : book.description}
        </p>
      </div>
    </div>
    <div className="section">
      <div className="infos">
        <p>Pages: {book == undefined ? null : book.pages} pagini</p>
        <p>Language: {book == undefined ? null : book.language}</p>
        <p>Book type: {book == undefined ? null : book.format}</p>
        <p>ISBN: {book == undefined ? null : book.isbn}</p>
        <p>ID: {book == undefined ? null : book._id}</p>
      </div>
    </div>

    <div className="actions">
      <button className="btn">Am citit</button>
      <button className="btn">Wishlist</button>
      <button onClick={onChangeReading} className="btn">
        Citeste ebook
      </button>
      <button className="btn">Descarca ebook</button>
    </div>

    <div className="subcategories">
      {book.subcategories.map((sc) => (
        <Link className="titlu" to={`/library/book/${sc}`}>
          {sc}
        </Link>
      ))}
    </div>
  </div>

*/
