import React from 'react';
import { Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';

const Admin = ({ auth: { isAuthenticated, loading, user } }) => {
	if (user !== null && user.role == 'user') {
		return <Redirect to="/" />;
	} else {
		return (
			<div>
				<p>admin page</p>
				<p>admin page</p>
				<p>admin page</p>
				<p>admin page</p>
				<p>admin page</p>
				<p>admin page</p>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Admin);
