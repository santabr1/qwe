const {getDyingTasks, getDeadTasks} = require('../routes/queries/tasks_queries')
const {putNotification, checkByUnique} = require('../routes/queries/notifications_queries')
const {getDeveloperById} = require('../routes/queries/developers_queries')
const mysql = require('mysql2')

//Функция валидации ошибки при обработке запросов
function resError(errMessage, res, err) {
    console.log(err)
    console.log(errMessage)
    return res.end(JSON.stringify({errMessage}))
}

function changeStringDateToPlus3Hours(stringDate) {
    let datePlus3Hours = (new Date(Date.parse(stringDate) + 1000 * 60 * 60 * 3)).toJSON()
    return datePlus3Hours.replace('T', ' ').replace('Z', '')
}

function notificationsTimer(connection) {
    notificationSender(connection)
    return setInterval(
        () => notificationSender(connection),
        1000 * 60
    )
}

function notificationSender(connection) {
    const stringDateNow = (new Date(Date.now() + 1000 * 60 * 60 * 3)).toJSON().replace('T', ' ').replace('Z', '')

    connection.query(
        sqlSafeDecorator(getDeadTasks, stringDateNow)(),
        (err, result) => {
            if(err)
                console.log(err)
            else {
                for(let dyingTask of result) {
                    connection.query(
                        sqlSafeDecorator(getDeveloperById, +dyingTask.task_lead_id),
                        (developerErr, developerResult) => {
                            if(developerErr)
                                console.log(developerErr)
                            else {
                                putSingleNotification(
                                    developerResult[0].developer_name + ' ' + developerResult[0].developer_surname,
                                    `The task "${dyingTask.task_title}" has timed out. Task results:\n` + dyingTask.task_results,
                                    connection,
                                    dyingTask,
                                    stringDateNow
                                )
                            }
                        }
                    )
                }
            }
        }
    )


    connection.query(
        sqlSafeDecorator(getDyingTasks, stringDateNow)(),
        (err, result) => {
            if(err)
                console.log(err)
            else {
                for(let dyingTask of result) {
                    putSingleNotification(
                        'System',
                        `The current execution time for the "${dyingTask.task_title}" task you are working
                                    on expires in less than a day. Make the necessary edits, prepare
                                    documentation. Have a good day.`,
                        connection,
                        dyingTask,
                        stringDateNow
                    )
                }
            }
        }
    )
}

function putSingleNotification(sender, content, connection, dyingTask, stringDateNow) {
    connection.query(
        sqlSafeDecorator(checkByUnique, sender, content)(),
        (checkErr, checkResult) => {
            if(checkErr)
                console.log(checkErr)
            else if(checkResult[0]['COUNT(*)'] === 0) {

                connection.query(
                    sqlSafeDecorator(
                        putNotification,
                        sender,
                        content,
                        stringDateNow,
                        +dyingTask.task_id
                    )(),
                    (err) => err
                        ? console.log(err)
                        : null
                )
            }
        }
    )
}


function sqlSafeDecorator(queryConstructorCB, ...args) {
    const escapedArgs = args.map(a => mysql.escape(a))
    return () => queryConstructorCB(...escapedArgs)
}

module.exports = {
    resError,
    changeStringDateToPlus3Hours,
    notificationsTimer,
    sqlSafeDecorator
}