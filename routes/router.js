const express = require('express');
const router = express.Router();
const db = require('../db.js');

const usersMiddleware = require('../middleware/users.middleware.js');
const UsersRepository = require('../repository/users.repository.js');
const getUsersController = require('../controller/users.controller.js');
const getDashboardController = require('../controller/dashboard.controller.js');

const usersController = getUsersController(UsersRepository)
const dashboardController = getDashboardController({});

router.post('/sign-up', usersMiddleware.validateRegister, async (req, res, next) => { 
    usersController.register(req, res, next)
});

router.post('/login', usersController.login);

router.get('/dashboard', usersMiddleware.isLoggedIn, dashboardController.load);

module.exports = router;
