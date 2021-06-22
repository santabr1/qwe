const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql2')
const config = require('./config')
const vars = require('./middlewares/vars')
const developersRouter = require('./routes/developers_router')
const projectsRouter = require('./routes/projects_router')
const tasksRouter = require('./routes/tasks_router')
const changingDatesRouter = require('./routes/changing_dates_router')
const notificationsRouter = require('./routes/notification_router')
const achievementsRouter = require('./routes/achievents_router')
const workingTimeRouter = require('./routes/working_time_router')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const app = express()

const {notificationsTimer} = require('./utils/utls')

const connection = mysql.createConnection({
    host: config.SQL_CONNECTION_HOST,
    user: config.SQL_CONNECTION_USER,
    database: config.SQL_CONNECTION_DATABASE,
    password: config.SQL_CONNECTION_PASSWORD,
    port: config.SQL_CONNECTION_PORT
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.FRONT_ADDRESS)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

//Промежуточные слои для парсинга req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(vars(connection))

app.use('/developers', developersRouter)
app.use('/projects', projectsRouter)
app.use('/tasks', tasksRouter)
app.use('/changing_dates', changingDatesRouter)
app.use('/notifications', notificationsRouter)
app.use('/achievements', achievementsRouter)
app.use('/working_time', workingTimeRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const server = app.listen(config.PORT, () => {
    connection.connect(err => {
        if(err) {
            console.log('must be closed')
            server.close()
        }
        else {
            console.log('successful')
            notificationsTimer(connection)
        }
    })
})