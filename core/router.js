const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Token Encryption
const config = require('./config');

//Login
const login_db = require('../api/login');
router.post('/api/Login', login_db.Login);

//Token Valid
router.use('/api', async function (req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
        try{
            const decoded = await jwt.verify(token, config.encryption);
            req.decoded = decoded;
            next();
        }
        catch(err) {
            res.status(403).json({
                success: false,
                message: err.message
            });
        }
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
});

//Driver Info


//User Info
const passenger_db = require('../api/passenger');
router.post('/api/PassengerInfo', passenger_db.PassengerInfo);

router.use('/api/', function (req, res) {
    res.status(404).json({
        success: false,
        message: 'API not exist'
    });
});

const path = require('path');
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
