const express = require('express');
const router = express.Router();

const fs = require('fs');

router.post('/', (req, res) => {

	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' });
	}

	const myFile = req.files.file;

  myFile.mv(`${process.cwd()}/public/${myFile.name}`, function(err) {
			if (err) {
				console.log(err);
				return res.status(500).send({ msg: 'Error occured' });
			}
		});
});

router.get('/', (req, res) => {
	let myFiles = [];
	fs.readdir('public', (err, files) => {

		files.forEach((file) => {
			const newObj = {
				name: file,
				path: `/${file}`
			};
			myFiles.push(newObj);
		});

		if (err) {
			console.log(err);
			return res.status(500).send({ msg: 'error getting files' });
		} else {
			return res.send(myFiles);
		}
	});

});

module.exports = router;