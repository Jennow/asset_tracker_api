module.exports = (repository) => {
    const NotificationsController = {
        load: async function(req, res, next) {
            const userId = req.userData.id;
            const notifications = await repository.getNotifications(userId);
            return res.status(201).json(notifications);
        }
    }

    return NotificationsController;
} 