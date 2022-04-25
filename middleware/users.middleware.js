const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
     validateRegister: async (req, res, next) => {
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                message: 'Please enter a username with min. 3 chars',
            });
        }

        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: 'Please enter a password with min. 6 chars',
            });
        }

        if (!req.body.repeat || req.body.password !== req.body.repeat) {
            return res.status(400).send({
                message: 'Both passwords must match',
            });
        }

        if (!req.body.currencyid) {
            return res.status(400).send({
                message: 'Please select currency'
            });
        }

        if (!req.body.email) {
            return res.status(400).send({
                message: 'Please enter a valid email adress'
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {

        try {
            if (!req.headers.authorization) {
                throw {};
            }
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(400).send({
                message: 'Your session is not valid'
            })
        }
     }
}