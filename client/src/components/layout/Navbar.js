import React, { useState, useEffect, Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import store from "../../store/store";
import { loadData, loadBook } from "../../actions/book";

import logo from "../../assets/logo.png";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  profile,
  data,
}) => {
  const [open, setOpen] = useState(false);
  let history = useHistory();
  if (window.initialWidth < 700) setOpen(true);

  useEffect(() => {
    store.dispatch(loadData());
  }, []);

  const handleOnSearch = (string, cached) => {
    console.log(string, cached);
  };

  const handleOnSelect = (item) => {
    store.dispatch(loadBook(item._id));
    history.push(`/library/book/${item._id}`);
  };

  const handleOnFocus = () => {
    console.log("focused");
  };

  return (
    <nav>
      <div className="left-nav">
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="search-bar">
        <ReactSearchAutocomplete
          items={data !== null ? data : ""}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          fuseOptions={{ keys: ["title", "author"] }}
          resultStringKeyName="title"
          autoFocus
          styling={{
            border: "1px solid #337ab7",
            backgroundColor: "white",
            color: "#666",
            iconColor: "#337ab7",
            lineColor: "#337ab7",
            placeholderColor: "#337ab7",
          }}
        />
      </div>

      <ul className={`nav-links ${open ? "open" : null} `}>
        {isAuthenticated ? (
          <Fragment>
            <Link onClick={() => setOpen(!open)} to="/library">
              Biblioteca
            </Link>

            <Link onClick={() => setOpen(!open)} to="/profile">
              Profile
            </Link>
            {user !== null && user.role == "admin" ? (
              <Fragment>
                <Link onClick={() => setOpen(!open)} to="/admin">
                  Admin
                </Link>
              </Fragment>
            ) : (
              <Fragment />
            )}
            <Link
              onClick={() => {
                logout();
                setOpen(!open);
              }}
              to="/login"
            >
              Logout
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link onClick={() => setOpen(!open)} to="/register">
              Register
            </Link>
            <Link onClick={() => setOpen(!open)} to="/login">
              Login
            </Link>{" "}
          </Fragment>
        )}
      </ul>

      <HamburgerMenu
        isOpen={open}
        menuClicked={() => setOpen(!open)}
        width={30}
        height={18}
        strokeWidth={5}
        rotate={0}
        color="black"
        className="menu"
        borderRadius={25}
        animationDuration={0.5}
      />
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.book.data,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
