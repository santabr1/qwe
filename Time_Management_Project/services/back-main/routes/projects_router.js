const {Router} = require('express')
const {projectsQueries} = require('./queries/queries')
const {resError, sqlSafeDecorator} = require('../utils/utls')
const projectsRouter = Router()

projectsRouter.get('/get', (req, res) => {
    try {
        const title = req.query.title
        const developerId = +req.query.developerId
        const page = +req.query.page
        const pagSize = +req.query.pagSize

        const query = title
            ? developerId
                ? sqlSafeDecorator(projectsQueries.getDevelopersProjectsByTitle, developerId, title + '%', page, pagSize)()
                : sqlSafeDecorator(projectsQueries.getAllByTitle, title + '%', page, pagSize)()
            : developerId
                ? sqlSafeDecorator(projectsQueries.getDevelopersProjects, developerId, page, pagSize)()
                : sqlSafeDecorator(projectsQueries.getAll, page, pagSize)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get projects', res, err)

                //Перед отправкой приведение даты дедлайна каждого проекта с нужному часовому поясу
                : res.end(JSON.stringify(
                    result.map(pr => ({
                        ...pr,
                        project_deadline: new Date(Date.parse(pr.project_deadline) + 1000 * 60 * 60 * 3),
                        project_description: pr.project_description || ''
                    }))
                ))
        )
    } catch (err) {
        return resError('Failed to get projects', res, err)
    }
})

projectsRouter.get('/get/:id', (req, res) => {
    try {
        const id = +req.params.id
        let query = sqlSafeDecorator(projectsQueries.getById, id)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get project by id', res, err)

                //Перед отправкой приведение даты дедлайна выбранного проекта с нужному часовому поясу
                : res.end(JSON.stringify(
                    result.map(pr => ({
                        ...pr,
                        project_deadline: new Date(Date.parse(pr.project_deadline) + 1000 * 60 * 60 * 3),
                        project_description: pr.project_description || ''
                    }))
                ))
        )
    } catch (err) {
        return resError('Failed to get project by id', res, err)
    }
})

projectsRouter.get('/count', (req, res) => {
    try {
        const title = req.query.title
        const developerId = +req.query.developerId

        const query = title
            ? developerId
                ? sqlSafeDecorator(projectsQueries.getDevelopersProjectsCountByTitle, developerId, title + '%')()
                : sqlSafeDecorator(projectsQueries.getCountByTitle, title + '%')()
            : developerId
                ? sqlSafeDecorator(projectsQueries.getDevelopersProjectsCount, developerId)()
                : sqlSafeDecorator(projectsQueries.getAllCount)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get projects count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Failed to get projects count', res, err)
    }
})

//Проверка на то, что пользователь с id не заведует проектом
//* Была необходима в случае, если тип отношения developer --leads-- project 1:1
//На данный момент был изменен тип отношения, но обработка роута осталась на случай
//изменения реализации отношения
projectsRouter.get('/check-for-lead/:id', (req, res) => {
    try {
        const id = +req.params.id
        let query = sqlSafeDecorator(projectsQueries.checkByLead, id)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to leader check', res, err)
                : res.end(JSON.stringify({passed: result[0]['COUNT(*)'] === 0}))
        )
    } catch (err) {
        return resError('Failed to leader check', res, err)
    }
})

projectsRouter.post('/put-project', (req, res) => {
    try {
        const projectData = req.body
        let query = sqlSafeDecorator(
            projectsQueries.putProject,
            projectData.title,
            projectData.description || null,
            projectData.deadline,
            +projectData.leadId || null
        )()

        req.connection.query(
            query,
            (err) => err
                ? resError('Failed to put project', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Failed to put project', res, err)
    }
})

projectsRouter.get('/delete/:id', (req, res) => {
    try {
        const id = +req.params.id
        let query = sqlSafeDecorator(projectsQueries.deleteProject, id)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to delete project', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Failed to delete project', res, err)
    }
})

projectsRouter.post('/update/:id', (req, res) => {
    try {
        const id = +req.params.id

        let query = sqlSafeDecorator(
            projectsQueries.updateProject,
            id,
            req.body.title,
            req.body.description || null,
            req.body.deadline,
            +req.body.leadId || null
        )()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to update project', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Failed to update project', res, err)
    }
})


module.exports = projectsRouter