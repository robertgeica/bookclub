const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
let Profile = require('../../models/Profile');

// @route           GET /profile
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const profile = await Profile.find(query);

		res.send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /profile/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const profile = await Profile.findById(id);

		if (profile.userId !== req.user.id) {
			console.log('not allowed to delete this profile');
		}

		res.json(profile);
	} catch (error) {
		res.status(400).send('Error getting the profile.');
	}
});

// @route           POST /profile
// @description     Add profile
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let profile = await new Profile(req.body);
		profile.userId = req.user.id;
		profile.save();

		res.status(200).json({ profile: 'Added new profile successfully!' });
	} catch (error) {
		res.status(400).send('Adding new profile failed.');
	}
});

// @route           POST /profile/:id
// @description     Update profile task
router.post('/:id', auth, async (req, res) => {
	console.log(req.body);
	try {
		let profile = await Profile.findById(req.params.id);

		if (profile.userId !== req.user.id) {
			console.log('not allowed to delete this profile');
		}

		if (!profile) res.status(404).send('No profile to update.');

		profile.username = req.body.username;
		profile.profileImage = req.body.profileImage;
		profile.wishlist = req.body.wishlist;
		profile.readingList = req.body.readingList;
		profile.readedBooks = req.body.readedBooks;
		profile.points = req.body.points;

		await profile.save();
		res.json('profile updated successfully.');
	} catch (error) {
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;