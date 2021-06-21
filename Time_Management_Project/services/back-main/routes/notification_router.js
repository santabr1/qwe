const {Router} = require('express')
const {notificationsQueries} = require('./queries/queries')
const {resError, changeStringDateToPlus3Hours, sqlSafeDecorator} = require('../utils/utls')
const notificationsRouter = Router()

notificationsRouter.get('/get_all', (req, res) => {
    try {
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const query = sqlSafeDecorator(notificationsQueries.getAllNotifications, page, pagSize)()

        req.connection.query(
            query,
            (err, result) => {
                if(err)
                    return resError('Can`t get all notifications', res, err)
                else {
                    for(let notification of result) {
                        notification.notif_date = changeStringDateToPlus3Hours(notification.notif_date)
                    }
                    return res.end(JSON.stringify(result))
                }
            }
        )
    } catch (err) {
        return resError('Can`t get all notifications', res, err)
    }
})

notificationsRouter.get('/get/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const query = sqlSafeDecorator(notificationsQueries.getNotificationsByTaskId, taskId, page, pagSize)()

        req.connection.query(
            query,
            (err, result) => {
                if(err)
                    return resError('Can`t get notifications by taskId', res, err)
                else {
                    for(let notification of result) {
                        notification.notif_date = changeStringDateToPlus3Hours(notification.notif_date)
                    }
                    return res.end(JSON.stringify(result))
                }
            }
        )
    } catch (err) {
        return resError('Can`t get notifications by taskId', res, err)
    }
})

notificationsRouter.get('/get_by_developer/:developer_id', (req, res) => {
    try {
        const developerId = +req.params.developer_id
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const query = sqlSafeDecorator(notificationsQueries.getNotificationsByDeveloperId, developerId, page, pagSize)()

        req.connection.query(
            query,
            (err, result) => {
                if(err)
                    return resError('Can`t get notifications by developer id', res, err)
                else {
                    for(let notification of result) {
                        notification.notif_date = changeStringDateToPlus3Hours(notification.notif_date)
                    }
                    return res.end(JSON.stringify(result))
                }
            }
        )
    } catch (err) {
        return resError('Can`t get notifications by developer id', res, err)
    }
})

notificationsRouter.get('/all_count', (req, res) => {
    try {
        const query = sqlSafeDecorator(notificationsQueries.getAllNotificationsCount)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Can`t get all count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Can`t get all count', res, err)
    }
})

notificationsRouter.get('/count/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const query = sqlSafeDecorator(notificationsQueries.getNotificationsCountByTaskId, taskId)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Can`t get all count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Can`t get all count', res, err)
    }
})

notificationsRouter.get('/count_by_developer/:developer_id', (req, res) => {
    try {
        const developerId = +req.params.developer_id
        const query = sqlSafeDecorator(notificationsQueries.getNotificationsCountByDeveloperId, developerId)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Can`t get count by developer id', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Can`t get count by developer id', res, err)
    }
})

notificationsRouter.get('/delete/:notification_id', (req, res) => {
    try {
        const notificationId = +req.params.notification_id
        const query = sqlSafeDecorator(notificationsQueries.deleteNotification, notificationId)()

        req.connection.query(
            query,
            (err) => err
                ? resError('Can`t delete notification', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Can`t delete notification', res, err)
    }
})

notificationsRouter.post('/put_notification', (req, res) => {
    try {
        const newNotification = req.body
        const query = sqlSafeDecorator(
            notificationsQueries.putNotification,
            newNotification.sender,
            newNotification.content,
            newNotification.date,
            +newNotification.taskId
        )()

        req.connection.query(
            query,
            (err) => err
                ? resError('Can`t put notification', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Can`t put notification', res, err)
    }
})

notificationsRouter.post('/update_notification/:notification_id', (req, res) => {
    try {
        const notificationId = +req.params.notification_id
        const newContent = req.body.content
        const query = sqlSafeDecorator(notificationsQueries.updateNotification, notificationId, newContent)()

        req.connection.query(
            query,
            (err) => err
                ? resError('Can`t update notification', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Can`t update notification', res, err)
    }
})

module.exports = notificationsRouter