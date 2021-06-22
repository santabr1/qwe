const {Router} = require('express')
const {resError, sqlSafeDecorator} = require('../utils/utls')
const config = require('../config')
const {tasksQueries, developersQueries} = require('./queries/queries')
const tasksRouter = Router()

tasksRouter.get('/get/:project_id', (req, res) => {
    try {
        const projectId = +req.params.project_id
        const title = req.query.title
        const developerId = +req.query.developerId
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        let query = title
            ? developerId
                ? sqlSafeDecorator(tasksQueries.getDevelopersTasksByTitle, developerId, projectId, title + '%', page, pagSize)()
                : sqlSafeDecorator(tasksQueries.getByTitle, projectId, title + '%', page, pagSize)()
            : developerId
                ? sqlSafeDecorator(tasksQueries.getDevelopersTasks, developerId, projectId, page, pagSize)()
                : sqlSafeDecorator(tasksQueries.getAllByProjectId, projectId, page, pagSize)()

        console.log(query)


        req.connection.query(
            query,
            (err, result) => {
                if (err)
                    return resError('Сouldn\'t get tasks', res, err)
                else {
                    const promiseArray = []
                    for (let task of result) {
                        task.task_results = task.task_results || ''
                        task.task_description = task.task_description || ''
                        const taskLeadPromise = new Promise((resolve, reject) => {
                            req.connection.query(
                                sqlSafeDecorator(developersQueries.getDeveloperById, task.task_lead_id)(),
                                (err, leadResult) => {
                                    if (err) {
                                        console.log(err)
                                        reject(err)
                                    } else {
                                        task.lead = leadResult[0]
                                        resolve()
                                    }
                                }
                            )
                        })
                        promiseArray.push(taskLeadPromise)
                    }
                    Promise.all(promiseArray)
                        .then(() => res.end(JSON.stringify(result)))
                        .catch(err => resError('Сouldn\'t get tasks', res, err))
                }
            }
        )

    } catch (err) {
        return resError('Сouldn\'t get tasks', res, err)
    }
})

tasksRouter.get('/get_single/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const query = sqlSafeDecorator(tasksQueries.getById, taskId)()

        req.connection.query(
            query,
            (err, result) => {
                if (err)
                    return resError('Сouldn\'t get single tasks', res, err)
                else {
                    result[0].task_results = result[0].task_results || ''
                    result[0].task_description = result[0].task_description || ''
                    new Promise((resolve, reject) => {
                        req.connection.query(
                            sqlSafeDecorator(developersQueries.getDeveloperById, +result[0].task_lead_id)(),
                            (err, leadResult) => {
                                if (err) {
                                    console.log(err)
                                    reject(err)
                                } else {
                                    result[0].lead = leadResult[0]
                                    result[0].lead && (result[0].lead.developer_avatar_url = result[0].lead.developer_avatar_url || `https://34.120.98.225:${config.PORT}/images/avatar.png`)
                                    resolve()
                                }
                            }
                        )
                    })
                        .then(() => res.end(JSON.stringify(result)))
                        .catch(err => resError('Сouldn\'t get single task', res, err))
                }
            }
        )
    } catch (err) {
        return resError('Сouldn\'t get single task', res, err)
    }
})

tasksRouter.get('/count/:projectId', (req, res) => {
    try {
        const projectId = +req.params.projectId
        const title = req.query.title
        const developerId = +req.query.developerId

        let query = title
            ? developerId
                ? sqlSafeDecorator(tasksQueries.getDevelopersTasksCountByTitle, developerId, projectId, title + '%')()
                : sqlSafeDecorator(tasksQueries.getCountByTitle, projectId, title + '%')()
            : developerId
                ? sqlSafeDecorator(tasksQueries.getDevelopersTasksCount, developerId, projectId)()
                : sqlSafeDecorator(tasksQueries.getAllCount, projectId)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Сouldn\'t get tasks count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Сouldn\'t get tasks count', res, err)
    }
})

tasksRouter.get('/delete/:taskId', (req, res) => {
    try {
        const taskId = +req.params.taskId
        const query = sqlSafeDecorator(tasksQueries.delete, taskId)()

        req.connection.query(
            query,
            (err) => err
                ? resError('Сouldn\'t delete task', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Сouldn\'t delete task', res, err)
    }
})

tasksRouter.post('/update/:taskId', (req, res) => {
    try {
        const taskId = +req.params.taskId
        const query = sqlSafeDecorator(
            tasksQueries.update,
            taskId,
            req.body.title,
            req.body.description || null,
            req.body.results || null,
            +req.body.leadId || null
        )()

        req.connection.query(
            query,
            (updateErr) => {
                if(updateErr)
                    return resError('Сouldn\'t update task', res, updateErr)
                else {
                    req.connection.query(
                        sqlSafeDecorator(developersQueries.checkDeveloperInTask, taskId, +req.body.leadId)(),
                        (checkErr, result) => {
                            if(checkErr)
                                return resError('Сouldn\'t check developer by including in task', res, checkErr)
                            else if(result[0]['COUNT(*)'] === 0)
                                req.connection.query(
                                    sqlSafeDecorator(tasksQueries.addDeveloperToTask, +req.body.leadId, taskId)(),
                                    (addErr) => addErr
                                        ? resError('Сouldn\'t add developer to task', res, checkErr)
                                        : res.end()
                                )
                            else
                                res.end()
                        }
                    )
                }
            }
        )
    } catch (err) {
        return resError('Сouldn\'t update task', res, err)
    }
})

tasksRouter.post('/put', (req, res) => {
    try {
        const query = sqlSafeDecorator(
            tasksQueries.put,
            req.body.title,
            req.body.description || null,
            req.body.results || null,
            req.body.actualDeadline,
            req.body.plannedDeadline,
            +req.body.leadId || null,
            +req.body.projectId
        )()

        req.connection.query(
            query,
            (putErr, updateResult) => {
                if(putErr)
                    return resError('Сouldn\'t put task', res, putErr)
                else {
                    if(req.body.leadId) {
                        req.connection.query(
                            sqlSafeDecorator(tasksQueries.addDeveloperToTask, +req.body.leadId, +updateResult.insertId)(),
                            (addErr) => addErr
                                ? resError('Сouldn\'t add developer to task', res, checkErr)
                                : res.end()
                        )
                    } else
                        res.end()
                }
            }
        )

    } catch (err) {
        return resError('Сouldn\'t put task', res, err)
    }
})

tasksRouter.get('/delete_developer/:task_id?/:developer_id?', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const developerId = +req.params.developer_id
        const query = sqlSafeDecorator(tasksQueries.deleteDeveloperFromTask, developerId, taskId)()

        req.connection.query(
            query,
            (err) => err
                ? resError('Сouldn\'t delete developer from task', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Сouldn\'t delete developer from task', res, err)
    }
})

tasksRouter.post('/add_developer', (req, res) => {
    try {
        const developerId = +req.body.developerId
        const taskId = +req.body.taskId
        const query = sqlSafeDecorator(tasksQueries.addDeveloperToTask, developerId, taskId)()

        req.connection.query(
            query,
            (err) => err
                ? resError('Сouldn\'t add developer to task', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Сouldn\'t add developer to task', res, err)
    }
})


tasksRouter.get('/get_by_developer/:developerId', (req, res) => {
    try {
        const developerId = +req.params.developerId
        let query = sqlSafeDecorator(tasksQueries.getAllDevelopersTasks, developerId)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Сouldn\'t get tasks', res, err)
                : res.end(JSON.stringify(result))
        )

    } catch (err) {
        return resError('Сouldn\'t get tasks', res, err)
    }
})

tasksRouter.get('/get_all', (req, res) => {
    try {
        let query = sqlSafeDecorator(tasksQueries.getAll)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Сouldn\'t get tasks', res, err)
                : res.end(JSON.stringify(result))
        )

    } catch (err) {
        return resError('Сouldn\'t get tasks', res, err)
    }
})

module.exports = tasksRouter