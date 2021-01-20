const mongoose = require('mongoose');

const db = process.env.MONGODB_URI || 'mongodb://127.0.0.1/bookclub';

const connectDb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('Database connected ...');
	} catch (error) {
		console.log(`Error connecting to db: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDb;
