import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import store from "../../store/store";
import { loadProfile } from "../../actions/profile";

const ProfilePage = ({ auth: { isAuthenticated, loading, user }, data }) => {


  // console.log(user);
  useEffect(() => {
    if(user !== null) {
      store.dispatch(loadProfile(user._id));
    }
  }, []);

 
  return (
    <div className="profile">
     
    </div>
  );
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	data: state.profile
});

export default connect(mapStateToProps)(ProfilePage);
