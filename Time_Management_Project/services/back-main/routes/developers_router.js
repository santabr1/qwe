const {Router} = require('express')
const cryptoJS = require('crypto-js')
const multer = require('multer')
const {developersQueries} = require('./queries/queries')
const config = require('../config')
const {resError, sqlSafeDecorator} = require('../utils/utls')
const bcrypt = require('bcryptjs')

const developerRouter = Router()

//Конфигурация для библиотеки по добавлению и обработке изображения
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/images/')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

//Секретные ключи для декодирования захешированных данных
const keyForPasswords = 'Hello_from_Australia'

//Функция декодинга даннных с клиента. Для исключения лишних символов,
//которые могут мешать передаче через URL используется encodeURIComponent на
//клиенте, соответственно здесь используется обратная функция
function decodeData(data, key) {
    return data ? decodeURIComponent(decodeURIComponent(cryptoJS.AES.decrypt(data, key)).toString(cryptoJS.enc.Utf8)) : ''
}

function getDevelopersManager(err, res, req, result, errMessage) {
    if (err)
        return resError(errMessage, res, err)

    const promises = []

    if (Array.isArray(result)) {
        for (let developer of result) {

            //Приведение даты рождения к часовому поясу +4 часа у каждого найденного разработчика
            developer.developer_birth = new Date(Date.parse(developer.developer_birth) + 1000 * 60 * 60 * 4)

            developer.developer_avatar_url = developer.developer_avatar_url || `http://35.234.116.28:${config.PORT}/images/avatar.png`
            developer.developer_patronymic = developer.developer_patronymic || ''

            //Запросы на получение данных о специальности и позиции разработчика.
            //Изначально хранятся как ссылки на поля в справочной сущности
            const positionChangePromise = new Promise(((resolve, reject) => {
                req.connection.query(
                    sqlSafeDecorator(developersQueries.getPosition, +developer.developer_position)(),
                    (err, posResult) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            developer.developer_position = posResult[0]['position_value']
                            resolve()
                        }
                    }
                )
            }))
            const specialtyChangePromise = new Promise(((resolve, reject) => {
                req.connection.query(
                    sqlSafeDecorator(developersQueries.getSpecialty, +developer.developer_specialty)(),
                    (err, specResult) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        } else {
                            developer.developer_specialty = specResult[0]['specialty_value']
                            resolve()
                        }

                    }
                )
            }))
            promises.push(positionChangePromise)
            promises.push(specialtyChangePromise)
        }

        //Отправка идет только после преобразования всех ссылок специальностей и позиций
        //В данные из справочных сущностей
        return Promise.all(promises)
            .then(() => res.end(JSON.stringify(result)))
            .catch(err => resError(errMessage, res, err))
    } else {
        return resError(errMessage, res, undefined)
    }
}

function getQueryManager(email, surname, emailAndSurnameCB, emailCB, surnameCB, allCB) {
    let query
    //Поиск по email и фамилии
    if (email && surname) {
        query = emailAndSurnameCB()
    } else {
        //Поиск только по email
        if (email) {
            query = emailCB()

            //Поиск только по фамилии
        } else if (surname) {
            query = surnameCB()

            //Поиск по id
        } else {
            query = allCB()
        }
    }

    return query
}


developerRouter.get('/get', (req, res) => {
    try {
        const decryptedEmail = req.query.email
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.getDevelopersBySurnameAndMail, decryptedEmail + '%', surname + '%', page, pagSize),
            sqlSafeDecorator(developersQueries.getDevelopersByEmail, decryptedEmail + '%', page, pagSize),
            sqlSafeDecorator(developersQueries.getDevelopersBySurname, surname + '%', page, pagSize),
            sqlSafeDecorator(developersQueries.getAllDevelopers, page, pagSize)
        )

        req.connection.query(query, (err, result) => getDevelopersManager(err, res, req, result, 'Сouldn\'t get developers'))
    } catch (err) {
        return resError('Сouldn\'t get developers', res, err)
    }
})

developerRouter.get('/get/:id', (req, res) => {
    try {
        const query = sqlSafeDecorator(developersQueries.getDeveloperById, +req.params.id)()
        req.connection.query(
            query,
            (err, result) => getDevelopersManager(err, res, req, result, 'Сouldn\'t get developers')
        )
    } catch (err) {
        return resError('Сouldn\'t get developers', res, err)
    }
})

developerRouter.get('/get_by_task/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const decryptedEmail = req.query.email
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.getDevelopersInTaskBySurnameAndEmail, taskId, page, pagSize, surname + '%', decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInTaskByEmail, taskId, page, pagSize, decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInTaskBySurname, taskId, page, pagSize, surname + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInTask, taskId, page, pagSize)
        )

        req.connection.query(query, (err, result) => getDevelopersManager(err, res, req, result, 'Сouldn\'t get developers'))

    } catch (err) {
        return resError('Сouldn\'t get developers', res, err)
    }
})

developerRouter.get('/get_by_project/:project_id', (req, res) => {
    try {
        const projectsId = +req.params.project_id
        const decryptedEmail = req.query.email
        const page = +req.query.page
        const pagSize = +req.query.pagSize
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.getDevelopersInProjectByEmailAndSurname, projectsId, page, pagSize, surname + '%', decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInProjectByEmail, projectsId, page, pagSize, decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInProjectBySurname, projectsId, page, pagSize, surname + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersInProject, projectsId, page, pagSize)
        )

        req.connection.query(query, (err, result) => getDevelopersManager(err, res, req, result, 'Сouldn\'t get developers'))

    } catch (err) {
        return resError('Сouldn\'t get developers', res, err)
    }
})

developerRouter.post('/update/:id', (req, res) => {
    try {
        const id = +req.params.id
        const developerData = req.body

        //Update для пользователей, не являющихся администраторами.
        if (Object.keys(developerData).length === 6) {
            req.connection.query(
                sqlSafeDecorator(
                    developersQueries.updateSurface,
                    id,
                    developerData.name,
                    developerData.surname,
                    developerData.patronymic || null,
                    developerData.birth,
                    developerData.email
                )(),
                (err) => err
                    ? resError('Failed to update developer', res, err)
                    : res.end()
            )

            // "Глубокий" update (для администраторов)
        } else {
            req.connection.query(
                sqlSafeDecorator(
                    developersQueries.updateDeep,
                    id,
                    developerData.name,
                    developerData.surname,
                    developerData.patronymic || null,
                    developerData.birth,
                    developerData.email,
                    +developerData.position,
                    +developerData.specialty,
                    +developerData.isAdmin,
                    developerData.avatarURL
                )(),
                (err) => err
                    ? resError('Failed to update developer', res, err)
                    : res.end()
            )
        }
    } catch (err) {
        return resError('Failed to update developer', res, err)
    }
})

developerRouter.post('/put-avatar/:id', upload.single('image'), (req, res) => {
    try {
        const id = +req.params.id
        const imagePath = req.file.path.replace(/public./, '').replace(/\\/, '/').replace(/\\/, '/')

        const query = sqlSafeDecorator(developersQueries.changeAvatarById, id, `http://35.234.116.28:${config.PORT}/` + imagePath)()

        req.connection.query(query, err => err
            ? resError('Failed to update avatar image', res, err)
            : res.end()
        )

    } catch (err) {
        return resError('Failed to update avatar image', res, err)
    }
})

developerRouter.get('/delete/:id', (req, res) => {
    try {
        const id = +req.params.id
        const query = sqlSafeDecorator(developersQueries.deleteById, id)()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to delete developer', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Failed to delete developer', res, err)
    }
})

developerRouter.post('/put', (req, res) => {
    try {
        const developerData = req.body
        req.connection.query(
            sqlSafeDecorator(
                developersQueries.put,
                developerData.name,
                developerData.surname,
                developerData.patronymic || null,
                developerData.birth.slice(0, developerData.birth.indexOf('T')),
                developerData.email,
                +developerData.position,
                +developerData.specialty,
                +developerData.isAdmin,
                bcrypt.hashSync(developerData.password, 5),
            )(),
            (err) => err
                ? resError('Failed to put developer', res, err)
                : res.end()
        )
    } catch (err) {
        return resError('Failed to put developer', res, err)
    }
})

developerRouter.get('/count', async (req, res) => {
    try {

        const decryptedEmail = req.query.email
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.countByEmailAndSurname, decryptedEmail + '%', surname + '%'),
            sqlSafeDecorator(developersQueries.countByEmail, decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.countBySurname, surname + '%'),
            sqlSafeDecorator(developersQueries.countAll)
        )

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get developers count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Failed to get developers count', res, err)
    }
})

developerRouter.get('/count_by_task/:task_id', (req, res) => {
    try {
        const taskId = +req.params.task_id
        const decryptedEmail = req.query.email
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.getDevelopersCountInTaskBySurnameAndEmail, taskId, surname + '%', decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInTaskByEmail, taskId, decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInTaskBySurname, taskId, surname + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInTask, taskId)
        )

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get developers count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Failed to get developers count', res, err)
    }
})
developerRouter.get('/count_by_project/:project_id', (req, res) => {
    try {
        const projectId = +req.params.project_id
        const decryptedEmail = req.query.email
        const surname = req.query.surname

        const query = getQueryManager(
            decryptedEmail,
            surname,
            sqlSafeDecorator(developersQueries.getDevelopersCountInProjectBySurnameAndEmail, projectId, surname + '%', decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInProjectByEmail, projectId, decryptedEmail + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInProjectBySurname, projectId, surname + '%'),
            sqlSafeDecorator(developersQueries.getDevelopersCountInProject, projectId)
        )

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get developers count', res, err)
                : res.end(JSON.stringify(result))
        )
    } catch (err) {
        return resError('Failed to get developers count', res, err)
    }
})

//Проверка доступности email для обновления или добавления
developerRouter.get('/checkEmail/:email/:id', async (req, res) => {
    try {
        const email = req.params.email
        const id = +req.params.id

        req.connection.query(
            sqlSafeDecorator(developersQueries.checkEmail, email, id)(),
            (err, result) => err
                ? resError('Failed to check email', res, err)
                : res.end(JSON.stringify({passed: result[0]['COUNT(*)'] === 0}))
        )
    } catch (err) {
        return resError('Failed to check email', res, err)
    }
})

developerRouter.get('/check-by-developer/:email', (req, res) => {
    try {
        const email = req.params.email
        const query = sqlSafeDecorator(developersQueries.checkByDeveloper, email)()

        req.connection.query(
            query,
            (err, result) => {
                if (err)
                    return resError('Failed to check by developer', res, err)
                if (!result.length)
                    return res.end(JSON.stringify({id: null}))
                else
                    return res.end(JSON.stringify({id: result[0]['developer_id']}))
            }
        )
    } catch (err) {
        return resError('Failed to check by developer', res, err)
    }
})

developerRouter.post('/get_auth', (req, res) => {
    try {
        const email = req.body.email
        const query = sqlSafeDecorator(developersQueries.getAuth, email)()

        req.connection.query(
            query,
            (err, result) => {
                try {
                    if (err) {
                        return resError('Failed authorisation', res, err)
                    } else {
                        if (result.length > 0 && bcrypt.compareSync(req.body.password, result[0].developer_password)) {
                            return res.end(JSON.stringify(result))
                        } else {
                            return resError('Неверное имя пользователя или пароль', res, err)
                        }
                    }

                } catch (newErr) {
                    console.log(err.stackTrace)
                    return resError('Failed authorisation', res, newErr)
                }

            }
        )
    } catch (err) {
        return resError('Failed authorisation', res, err)
    }
})

developerRouter.get('/get_subordinates/:developerId/:isAdmin', (req, res) => {
    try {
        const developerId = +req.params.developerId
        const isAdmin = req.params.isAdmin === 'true'

        console.log(developerId)
        console.log(isAdmin)

        const query = sqlSafeDecorator(
            developersQueries.getSubordinate,
            developerId,
            isAdmin
        )()

        req.connection.query(
            query,
            (err, result) => err
                ? resError('Failed to get subordinates', res, err)
                : res.end(JSON.stringify(result))
        )

    } catch (err) {
        return resError('Сouldn\'t get subordinates', res, err)
    }
})



module.exports = developerRouter