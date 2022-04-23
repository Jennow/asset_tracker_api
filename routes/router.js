const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
require('dotenv').config()

const db = require('../db.js');
const userMiddleware = require('../middleware/users.js');

// http://localhost:3000/api/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    console.log('signup');
    db.query(`SELECT id FROM users WHERE LOWER(username) = LOWER('${req.body.username}')`, (err, result) => {
       console.log(result);
        if (err) {
            throw err;
            return res.status(500).send({
                message: err
            })
        }

        if (result.length) {
            return res.status(409).send({
                message: 'This username is already in use!'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    throw err;
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    db.query(`
                    INSERT INTO users (id, username, email, password, currencyid, registered) 
                    VALUES (
                        '${uuid.v4()}', 
                        ${db.escape(req.body.username)}, 
                        ${db.escape(req.body.email)}, 
                        '${hash}', 
                        ${db.escape(req.body.currencyid)}, 
                        now()
                    )`, (err, response) => {
                        if (err) {
                            throw err;
                            return res.status(500).send({
                                message: err
                            });
                        }
                        return res.status(201).send({
                            message: 'registered'
                        })
                    });
                }
            });
        }
    });
});

    // http://localhost:3000/api/login
router.post('/login', (req, res, next) => {
    db.query(`SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`, (err, result) => {
        if (err) {
            throw err;
            return res.status(400).send({
                message: err,
            });
        }
        if (!result.length) {
            return res.status(400).send({
                message: 'Username or password incorrect',
            });
        }
        bcrypt.compare(req.body.password, result[0]['password'], (bErr, bRes) => {
            if (bErr) {
                throw bErr;
                return res.status(400).send({
                    message: 'Username or password incorrect',
                })
            }
            if (bRes) {
                const token = jwt.sign({
                    username: result[0].username,
                    userId: result[0].id
                }, process.env.SECRET_JWT_KEY, {
                    expiresIn: '1d'
                });
                db.query('UPDATE users SET last_login = now()');

                // unset(result[0].password)
                return res.status(200).send({
                    message: 'logged_in',
                    token: token,
                    user: result[0]
                })
            }
            return res.status(400).send({
                message: 'Username or password incorrect!',
            });
        });
    });
});
// http://localhost:3000/api/secret-route
router.get('/secretroute', (req, res, next) => {

});

module.exports = router;