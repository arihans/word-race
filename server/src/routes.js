const express = require('express');
const router = express.Router();

const controller = require('./controller');

// GET ------------------------------------------
router.get('/',
    controller.isLoggedIn,
    (req, res) => {
    res.send({ message: 'Hurray!! You are recieving the game' });
});

router.get('/login', (req, res) => {
    res.send({ message: 'YOU NEED TO LOG-IN :(' });
});

router.get('/register', (req, res) => {
    res.send({ message: 'GET REGISTER-ED BABY ;)' });
});

router.get('/leaderboard', (req, res) => {
    res.send({ message: 'I ain\'t got no leaderboard for ya ;)' });
});

router.get('/stat', (req, res) => {
    res.send({ message: 'Ur a Loser' });
});

// POST -----------------------------------------
router.post('/login', (req, res) => {
    console.log('LOGIN request')
    res.send({ message: 'LOG-IN-ED' });
});

router.post('/register', controller.regsiterPlayer);

module.exports = router;
