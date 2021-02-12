import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { connect } from "react-redux";
import store from "../../store/store";
import { loadBook, handleUpdateRating } from "../../actions/book";
import {
  handleAddToWishlist,
  handleAddToReadList,
} from "../../actions/profile";

import ReadBook from "./ReadBook";

const BookPage = (props) => {
  const book = props.book;
  const bookId = props.match.params.id;

  useEffect(() => {
    store.dispatch(loadBook(bookId));
  }, []);

  const onRatingChange = (newRating) => {
    // console.log(newRating);
    store.dispatch(handleUpdateRating(bookId, props.auth.user._id, newRating));
  };

  const [isReading, setIsReading] = useState(false);
  const onChangeReading = () => {
    setIsReading(!isReading);
  };

  let profile = props.profile.profile;
  let isWishlisted = false;
  let isCompletedBook = false;

  if (profile != null) {
    profile[0].wishlist.map((bkId) => {
      bkId == bookId ? (isWishlisted = true) : (isWishlisted = false);
    });

    profile[0].readedBooks.map((bkId) => {
      bkId == bookId ? (isCompletedBook = true) : (isCompletedBook = false);
    });
  }

  console.log(profile, book);

 
  let rating = 0;
  if (book == null) {
    return 0;
  } else {
    book.rating.map(r => {
      rating += parseInt(r.rating);
    });
    rating /= book.rating.length;
    
    return (
      <Fragment>
        <div className="book-page">
          <div className="top">
            <div className="img-container">
              <img src={`/${book.imageUrl}`} alt="cover" />
            </div>
            <div className="book-container">
              <div className="book-info">
                <h1>{book.title}</h1>
                by <a href="#">{book.author}</a>
                <ReactStars
                  count={10}
                  // value={book.rating}
                  value={rating}
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
                  <p>{book.pages}</p>
                </div>

                <div>
                  <span>Format</span>
                  <p>{book.format}</p>
                </div>

                <div>
                  <span>Language</span>
                  <p>{book.language}</p>
                </div>
              </div>

              <div className="book-id">
                <p id={book.isbn}>ISBN</p>
                <p id={book._id}>ID</p>
              </div>

              <div className="buttons">
                <button
                  id="btn1"
                  onClick={() =>
                    store.dispatch(
                      handleAddToReadList(book._id, props.auth.user._id)
                    )
                  }
                >
                  {isCompletedBook ? "Completed" : "Not completed"}

                </button>
                <button
                  id="btn2"
                  onClick={() =>
                    store.dispatch(
                      handleAddToWishlist(book._id, props.auth.user._id)
                    )
                  }
                >
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <button onClick={onChangeReading} id="btn3">
                  Citeste
                </button>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="descriere">
              <p>{book.description}</p>
            </div>

            <div className="subcategories">
              {book.subcategories.map((sc) => (
                <Link className="titlu" >
                  {sc}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {isReading ? <ReadBook book={book.fileName} /> : <Fragment></Fragment>}
      </Fragment>
    );
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  book: state.book.currentBook,
  profile: state.profile,
});

export default connect(mapStateToProps)(BookPage);
