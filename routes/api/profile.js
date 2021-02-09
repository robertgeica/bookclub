const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
let Profile = require('../../models/Profile');

// @route           GET /profile
// @description     Test route
router.get('/', async (req, res) => {
	try {
		const profile = await Profile.find();

		res.send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /profile/:id
// @description     Test route
router.get('/:id', async (req, res) => {
	try {

    let id = await req.params.id;
		const profile = await Profile.find({userId: id});

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

// @route           PUT /profile/:id
// @description     Update profile task
router.put('/:id', auth, async (req, res) => {
	try {
		let id = req.params.id;
		let profile = await Profile.find({userId: id});

		console.log(profile);
	
		if (!profile) res.status(404).send('No profile to update.');

		profile[0].username = req.body.username;
		profile[0].profileImage = req.body.profileImage;
		profile[0].wishlist = req.body.wishlist;
		profile[0].readingList = req.body.readingList;
		profile[0].readedBooks = req.body.readedBooks;
		profile[0].points = req.body.points;

		await profile[0].save();
		res.json('profile updated successfully.');
	} catch (error) {
		console.log(error);
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;