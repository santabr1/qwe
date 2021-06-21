const {Router} = require('express')
const {changingDatesQueries, tasksQueries} = require('./queries/queries')
const {resError, changeStringDateToPlus3Hours} = require('../utils/utls')
const {sqlSafeDecorator} = require('../utils/utls')
const changingDatesRouter = Router()

changingDatesRouter.get('/get/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const query = sqlSafeDecorator(changingDatesQueries.getAll, taskId)()

        req.connection.query(
            query,
            (err, result) => {
                if (err)
                    return resError(`Can't get changing dates`, res, err)
                else {
                    for (let cd of result) {
                        cd.changing_date_deadline_before = changeStringDateToPlus3Hours(cd.changing_date_deadline_before)
                        cd.changing_date_deadline_after = changeStringDateToPlus3Hours(cd.changing_date_deadline_after)
                    }
                    return res.end(JSON.stringify(result))
                }
            }
        )
    } catch (err) {
        resError(`Can't get changing dates`, res, err)
    }
})

changingDatesRouter.get('/delete/:changing_date_id', (req, res) => {
    try {
        const changingDateId = +req.params.changing_date_id
        const query = sqlSafeDecorator(changingDatesQueries.deleteChangingDate, changingDateId)()

        req.connection.query(
            query,
            (err) => err
                ? resError(`Can't delete changing date`, res, err)
                : res.end()
        )
    } catch (err) {
        resError(`Can't delete changing date`, res, err)
    }
})

changingDatesRouter.post('/put', (req, res) => {
    try {
        const addedChangingDate = req.body
        const query = sqlSafeDecorator(
            changingDatesQueries.putChangingDate,
            addedChangingDate.cause,
            addedChangingDate.deadlineBefore,
            addedChangingDate.deadlineAfter,
            +addedChangingDate.taskId
        )()

        req.connection.query(
            query,
            (err, result) => {
                if (err)
                    return resError(`Can't put changing date`, res, err)
                else {
                    const changeActualDeadlineQuery = sqlSafeDecorator(
                        tasksQueries.updateActualDeadline,
                        +addedChangingDate.taskId,
                        addedChangingDate.deadlineAfter
                    )()

                    req.connection.query(
                        changeActualDeadlineQuery,
                        (err) => err
                            ? resError(`Can't put changing date`, res, err)
                            : res.end()
                    )
                }
            }
        )
    } catch (err) {
        resError(`Can't put changing date`, res, err)
    }
})

changingDatesRouter.post('/update/:changing_date_id', (req, res) => {
    try {
        const updateId = +req.params.changing_date_id
        const updatedChangingDate = req.body
        const query = sqlSafeDecorator(
            changingDatesQueries.updateChangingDate,
            updateId,
            updatedChangingDate.cause
        )()

        req.connection.query(
            query,
            (err, result) => err
                ? resError(`Can't update changing date`, res, err)
                : res.end()
        )
    } catch (err) {
        resError(`Can't update changing date`, res, err)
    }
})

module.exports = changingDatesRouter