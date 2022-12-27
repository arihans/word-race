const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
	_username: {
		type: String,
		required: true,
	},
	_password: {
		type: String,
		required: true,
	},
	_highscore: {
		type: Number,
		default: 0,
	},
	_totalGamesPlayed: {
		type: Number,
		default: 0,
	},
    _averageScore: {
		type: Number,
		default: 0,
    },
});

module.exports = mongoose.model('Player', PlayerSchema);
