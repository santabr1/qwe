const {Router} = require('express')
const {workingTimeQueries} = require('./queries/queries')
const {resError, sqlSafeDecorator} = require('../utils/utls')
const workingTimeRouter = Router()
const config = require('../config')

workingTimeRouter.get('/get/:developerId', (req, res) => {
    try {
        const developerId = +req.params.developerId
        const date = req.query.date
        const query = sqlSafeDecorator(workingTimeQueries.getByDate, developerId, date)()

        req.connection.query(
            query,
            (err, result) => {
                if(err)
                    return resError('Can`t get working times', res, err)
                else {
                    return res.end(JSON.stringify(result))
                }
            }
        )
    } catch (err) {
        return resError('Can`t get working times', res, err)
    }
})

workingTimeRouter.post('/add', (req, res) => {
    try {
        const body = req.body
        console.log(body)
        const query = sqlSafeDecorator(
            workingTimeQueries.addWt,
            +body.developerId,
            +body.taskId,
            body.startTime,
            body.endTime,
            body.wtComment
        )()
        req.connection.query(
            query,
            (err) => {
                if(err)
                    return resError('Can`t add working times', res, err)
                else {
                    return res.end()
                }
            }
        )
    } catch (err) {
        return resError('Can`t add working times', res, err)
    }
})

workingTimeRouter.get('/delete_wt/:wtId', (req, res) => {
    try {
        const wtId = +req.params.wtId
        const query = sqlSafeDecorator(workingTimeQueries.deleteWt, wtId)()

        req.connection.query(
            query,
            (err) => {
                if(err)
                    return resError('Can`t delete working times', res, err)
                else {
                    return res.end()
                }
            }
        )
    } catch(err) {
        return resError('Can`t delete working times', res, err)
    }
})

workingTimeRouter.post('/update_status/:wtId', (req, res) => {
    try {
        const wtId = +req.params.wtId
        const status = req.body.status
        const query = sqlSafeDecorator(workingTimeQueries.changeStatus, wtId, status)()

        req.connection.query(
            query,
            (err) => {
                if(err)
                    return resError('Can`t change status', res, err)
                else {
                    return res.end()
                }
            }
        )
    } catch(err) {
        return resError('Can`t change status', res, err)
    }
})

workingTimeRouter.get('/get_for_calendar/:developerId/:monthNum/:yearNum', (req, res) => {
    try {
        const developerId = +req.params.developerId
        const monthNum = +req.params.monthNum
        const yearNum = +req.params.yearNum
        const query = sqlSafeDecorator(workingTimeQueries.getWtForCalendar, developerId, monthNum, yearNum)()

        req.connection.query(
            query,
            (err, result) => {
                if(err)
                    return resError('Can`t fill calendar', res, err)
                else {
                    let resultArray = []
                    let empty = result.filter(d => d.status === 0)
                    let performed = result.filter(d => d.status === 1)
                    let rejected = result.filter(d => d.status === 2)

                    for(let i = 0; i < result.length; i++) {
                        let dayObj = {flags: []}
                        dayObj.date = `${result[i].year}-${result[i].month}-${result[i].day}`
                        if(empty.filter(e => e.day === result[i].day).length > 0) {
                            dayObj.flags.push(0)
                        }
                        if(performed.filter(e => e.day === result[i].day).length > 0) {
                            dayObj.flags.push(1)
                        }
                        if(rejected.filter(e => e.day === result[i].day).length > 0) {
                            dayObj.flags.push(2)
                        }
                        resultArray.push(dayObj)
                    }

                    return res.end(JSON.stringify(resultArray))
                }
            }
        )
    } catch(err) {
        return resError('Can`t delete working times', res, err)
    }
})

module.exports = workingTimeRouter