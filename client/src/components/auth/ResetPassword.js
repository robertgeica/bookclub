import React, { useState, useEffect } from 'react';
// redux
import { connect } from 'react-redux';
import store from '../../store/store';
import { resetPassword } from '../../actions/auth';

const ResetPassword = ({ match }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
		password2: '',
		token: ''
	});
	const { email, password, password2, token } = formData;

	useEffect(() => {
		let token = match.params.token;
		if (token) {
			setFormData({ ...formData, token });
		}
	}, [match.params.token, formData]); // , []

	const handleChange = (text) => (e) => {
		setFormData({ ...formData, [text]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === password2 && password && password2) {
			store.dispatch(resetPassword({ password, email, token }));
		}
	};

	return (
		<div className="reset-password">
			<h2>Reset Your Password</h2>
				<form className="form" onSubmit={(e) => handleSubmit(e)}>
					<input
						type="password"
						placeholder="password"
						onChange={handleChange('password')}
						value={password}
					/>
					<input
						type="password"
						placeholder="Confirm password"
						onChange={handleChange('password2')}
						value={password2}
					/>
					<button className="button" type="submit">Submit</button>
				</form>
		</div>
	);
};

export default connect()(ResetPassword);