
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
require('dotenv').config()

module.exports = (repository) => {
    var user = {};
    var token = '';
    const UsersController = {
        register: async function(req, res, next) {
            await repository.findUserIdByUsername(req.body.username)
            .then((result) => {
                if (result.length) {
                    throw {
                        status: 409,
                        message: 'This username is already in use!'
                    }
                }
                return result
            })
            .then(() => bcrypt.hash(req.body.password, 10))
            .then(hash =>  repository.createUser(
                    uuid.v4(),
                    req.body.username, 
                    req.body.email, 
                    hash, 
                    req.body.currencyid)
            )
            .then(() => {
                return res.status(201).send({
                    message: 'registered'
                });
            })
            .catch(error =>  {
                const status = error.status ? error.status : 500;
                return res.status(status).send({
                    message: error.message ? error.message : error
                });
            })
        },
        login: async function(req, res, next) {
            await repository.findUserByUsername(req.body.username)
            .then((result) => {
                if (!result.length) {
                    throw {
                        status: 400,
                        message: 'Username or password incorrect!',
                    };
                }
                return result[0];
            }).then(foundUser => {
                user = foundUser;
                return bcrypt.compare(req.body.password, user.password)
            })
            .then(match => {
                console.log(match);
                if (match) {
                    token = jwt.sign({
                        username: user.username,
                        userId: user.id
                    }, process.env.SECRET_JWT_KEY, {
                        expiresIn: '1d'
                    });
                    console.log(token);
                    return;
                }
                throw {
                    status: 400,
                    message: 'Username or password incorrect!',
                };
            })
            .then(() => repository.updateUserLogin(user.id))
            .then(() => res.status(201).send({
                    message: 'logged_in',
                    token: token,
                    user: user
                })
            )
            .catch(error =>  {
                console.log(error);
                const status = error.status ? error.status : 500;
                return res.status(status).send({
                    message: error.message ? error.message : error
                });
            })
        }
    }

    return UsersController;
} 