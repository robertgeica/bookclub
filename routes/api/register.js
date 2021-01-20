const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../../models/User');

// @route           POST /register
// @description     Register User
// @access          Public
router.post(
	'/',
	[
		check('email', 'Email must be a valid one').isEmail(),
		check('password', 'Enter a valid password').isLength({ min: 6 })
	],
	async (req, res) => {
		const { email, password, role } = req.body;
		console.log(req.body);

		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// check if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists. ' });
			}

			user = new User({
				email,
				password,
        role
			});

			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// return jsonwebtoken
			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
