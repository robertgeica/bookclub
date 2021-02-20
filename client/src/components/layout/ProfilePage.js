import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import ScrollContainer from "react-indiana-drag-scroll";
import { connect } from "react-redux";
import store from "../../store/store";
import { loadProfile } from "../../actions/profile";
import { loadBook } from "../../actions/book";

const ProfilePage = ({
  auth: { isAuthenticated, loading, user },
  profile,
  books,
}) => {
  // console.log(profile, books);

  useEffect(() => {
    if (user !== null) {
      store.dispatch(loadProfile(user._id));
    }
  }, []);
  
  let wishlist = [];
  let completedBooks = [];
  if (books.data !== null && profile.profile !== null) {
    books.data.map((book) => {
      // wishlist
      profile.profile[0].wishlist.map((bk) =>
        bk == book._id ? wishlist.push(book) : ""
      );
      // completed book
      profile.profile[0].readedBooks.map((bk) =>
        bk == book._id ? completedBooks.push(book) : ""
      );
    });
  }
  console.log(wishlist);

  

  return (
    <div className="profile">
      <div className="profile-info">
        <img src={profile.profile == null ? '' : profile.profile[0].profileImage} alt="profile image" />
        
        <h2>@{profile.profile == null ? '' : profile.profile[0].username}</h2>

        <h3>Points: {profile.profile == null ? '' : profile.profile[0].points}</h3>
      </div>

      <h1>Wishlisted books</h1>
      <div className="books-row">
        <ScrollContainer className="scroll-container">
          {wishlist.map((book) => {
            return (
              <div key={book._id} className="book">
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
            );
          })}
        </ScrollContainer>
      </div>

      <h1>Completed books</h1>
      <div className="books-row">
        <ScrollContainer className="scroll-container">
          {completedBooks.map((book) => {
            return (
              <div key={book._id} className="book">
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
            );
          })}
        </ScrollContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  books: state.book,
});

export default connect(mapStateToProps)(ProfilePage);
