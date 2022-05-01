const express = require('express');
const router = express.Router();

const usersMiddleware = require('../middleware/users.middleware.js');
const assetsMiddleware = require('../middleware/assets.middleware.js');

const UsersRepository = require('../repository/users.repository.js');
const AssetsRepository = require('../repository/assets.repository.js');
const getUsersController = require('../controller/users.controller.js');
const getDashboardController = require('../controller/dashboard.controller.js');
const getNotificationsController = require('../controller/notifications.controller.js');
const UserassetsRepository = require('../repository/userassets.repository.js');
const TransactionsRepository = require('../repository/transactionsRepository.js');
const NotificationRepository = require('../repository/notifications.repository.js');
const getAssetsController = require('../controller/assets.controller');
const getTransactionsController = require('../controller/transactions.controller');


const usersController = getUsersController(UsersRepository)
const dashboardController = getDashboardController(AssetsRepository, UserassetsRepository, TransactionsRepository);
const notificationsController = getNotificationsController(NotificationRepository);
const assetsController = getAssetsController(AssetsRepository);
const transactionsController = getTransactionsController(TransactionsRepository);

router.post('/sign-up', usersMiddleware.validateRegister, async (req, res, next) => { 
    usersController.register(req, res, next)
});
router.post('/login', usersController.login);
router.get('/dashboard', usersMiddleware.isLoggedIn, dashboardController.load);
router.get('/notifications', usersMiddleware.isLoggedIn, notificationsController.load);
router.get('/assets', usersMiddleware.isLoggedIn, assetsController.load);
router.post('/assets', usersMiddleware.isLoggedIn, assetsMiddleware.validateAsset, assetsController.add);
router.post('/transactions', usersMiddleware.isLoggedIn, transactionsController.add);

module.exports = router;
