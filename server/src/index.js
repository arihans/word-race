const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

let Player = require('./model');
let routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;
const uri = `mongodb+srv://Arin-word_race:${process.env.DB_PASS}@cluster0.6runcfx.mongodb.net/?retryWrites=true&w=majority`;

// Connect to DB
try {
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (e) {
	console.error(e);
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Middleware to JWT header
app.use(function (req, res, next) {
	if (req.cookies.token) {
		jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET, function (
			err,
			decode
		) {
			if (err) {
				console.log('invalied cookie');
				res.sendStatus(500);
			}
			req.player = decode;
			next();
		});
	} else {
		req.player = undefined;
		next();
	}
});

app.use(routes);

app.use(function (req, res) {
	res.status(404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
