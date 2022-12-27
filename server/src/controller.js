const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const Player = require('./model');

exports.regsiterPlayer = async (req, res) => {
    console.log(req)
    const existingPlayer = await Player.findOne({ _username: req.body.username.toLowerCase() });
    if (existingPlayer) {
        res.status(422).send({ error: 'Username already exists' });
    }

    const player = new Player({
        _username: req.body.username.toLowerCase(),
        _password: req.body.password,
    });
    player.save((err, player) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'Player created successfully', player });
            res.redirect(200, '/');
        }
    });
};

exports.loginPlayer = async (req, res) => {
    const { username, password } = req.body;

    const player = await Player.findOne({ _username: username.toLowerCase() });
    if (!player) {
        return res.status(401).send({ error: 'Authentication failed. Invalid username or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, player._password);
    if (!isPasswordValid) {
        return res.status(400).send({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { username: username, password: password },
        process.env.JWT_SECRET
    );

    const cookieOptions = {
        httpOnly: true,
    };
    res.cookie('token', token, cookieOptions);
    res.redirect(200, '/')
};

exports.getLeaderboard = async (req, res) => {
    try {
        const topPlayers = await Player.find({}).sort({ score: -1 }).limit(10);
        res.send(topPlayers);
    } catch {
        res.status(500).send({ error: 'Failed to get leaderboard' });
    }
};

exports.getPlayerStats = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { username, _ } = jwt.verify(token, process.env.JWT_SECRET);

        const player = await Player.findOne({ _username: username });
        if (!player) {
            return res.status(404).send({ error: 'Player not found' });
        }

        res.send(player);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get player stats' });
    }
};

exports.savePlayerStat = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { username, _ } = jwt.verify(token, process.env.JWT_SECRET);
    const update = {}

    await Player.findOneAndUpdate({ _username: username }, update);

};

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { username, _ } = jwt.verify(token, process.env.JWT_SECRET);
        const player = await Player.findOne({ _username: username });

        if (player) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch {
        res.redirect('/login');
    }

};
