import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect, useHistory, Route } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import store from '../../store/store';

import logo from '../../assets/logo.png';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
	const [ open, setOpen ] = useState(false);
	let history = useHistory();

	if (window.initialWidth < 700) setOpen(true);
	
	return (
		<nav>
			<div className="left-nav">
				<Link className="logo" to="/">
					<img src={logo} />
				</Link>
			</div>

			<ul className={`nav-links ${open ? 'open' : null} `}>
				{isAuthenticated ? (
					<Fragment>
						<Link onClick={() => setOpen(!open)} to="/library">
							Biblioteca
						</Link>
						{user !== null && user.role == 'admin' ? (
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
						</Link>{' '}
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
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
