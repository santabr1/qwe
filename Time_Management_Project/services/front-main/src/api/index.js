import axios from 'axios'
import cryptoJS from 'crypto-js'
import {dateToDateString} from "../components/utils/formats";
import {config} from "../config";

const request = axios.create({baseURL: config.SERVER_ADDRESS})

const keyForPasswords = 'Hello_from_Australia'


//Функция, изменяющая имя пользователя по регистру
const titleItemsChange = (nameItem) => {
    if (!nameItem)
        return ''
    return nameItem.slice(0, 1).toUpperCase() + nameItem.slice(1, nameItem.length).toLowerCase()
}

export const workingTimeAPI = {
    getByDeveloperIdAndDates(developerId, date) {
        const fullFormatedDate = dateToDateString(date)
        const url = `working_time/get/${developerId}?date=${fullFormatedDate}`
        return request.get(url)
    },

    addWt(developerId, taskId, startTime, endTime, wtComment) {
        const url = `working_time/add`
        return request.post(url, {
            developerId,
            taskId,
            startTime,
            endTime,
            wtComment
        })
    },

    deleteWt(wtId) {
        const url = `working_time/delete_wt/${wtId}`
        return request.get(url)
    },

    updateStatus(wtId, status) {
        const url = `working_time/update_status/${wtId}`
        return request.post(url, {
            status
        })
    },

    fillCalendar(developerId, month, year) {
        const url = `working_time/get_for_calendar/${developerId}/${month}/${year}`
        return request.get(url)
    }
}

export const changingDatesAPI = {
    getAll(taskId) {
        const url = `changing_dates/get/${taskId}`
        return request.get(url)
    },

    deleteChangingDate(changingDateId) {
        const url = `changing_dates/delete/${changingDateId}`
        return request.get(url)
    },

    //В записях нет права изменять даты, только причину (Например в случае опечатки)
    updateChangingDate(changingDateId, cause) {
        const url = `changing_dates/update/${changingDateId}`
        return request.post(url, {cause})
    },

    putChangingDate(cause, deadlineBefore, deadlineAfter, taskId) {
        const url = 'changing_dates/put'
        return request.post(url, {
            cause,
            deadlineBefore,
            deadlineAfter,
            taskId
        })
    }
}

export const projectsAPI = {
    getProjects(page, pagSize, title) {
        const url = title
            ? `projects/get?title=${titleItemsChange(title)}&page=${page - 1}&pagSize=${pagSize}`
            : `projects/get?page=${page - 1}&pagSize=${pagSize}`
        return request.get(url)
    },
    getDevelopersProjects(page, pagSize, developerId, title) {
        const url = title
            ? `projects/get?developerId=${developerId}&title=${titleItemsChange(title)}&page=${page - 1}&pagSize=${pagSize}`
            : `projects/get?developerId=${developerId}&page=${page - 1}&pagSize=${pagSize}`
        return request.get(url)
    },

    getProjectById(id) {
        const url = `projects/get/${id}`
        return request.get(url)
    },

    getProjectsCount(title) {
        const url = title
            ? `projects/count?title=${titleItemsChange(title)}`
            : `projects/count`
        return request.get(url)
    },
    getDevelopersProjectCount(developerId, title) {
        const url = title
            ? `projects/count?developerId=${developerId}&title=${titleItemsChange(title)}`
            : `projects/count?developerId=${developerId}`
        return request.get(url)
    },

    putProject(title, description, deadline, leadId) {
        return request.post('projects/put-project', {
            title: titleItemsChange(title),
            description,
            deadline,
            leadId
        })
    },

    deleteProject(id) {
        const url = `projects/delete/${id}`
        return request.get(url)
    },

    changeProject(id, title, description, deadline, leadId) {
        const url = `projects/update/${id}`
        return request.post(url, {
            title,
            description,
            deadline,
            leadId
        })
    }
}


export const developersAPI = {
    getSubordinates(developerId, isAdmin) {
        const url = `developers/get_subordinates/${developerId}/${isAdmin}`
        return request.get(url)
    },

    getAuth(email, pass) {
        const hashPass = encodeURIComponent(cryptoJS.AES.encrypt(pass, keyForPasswords).toString())
        const url = `developers/get_auth`

        console.log(email)
        console.log(hashPass)
        return request.post(url, {
            email: email,
            password: hashPass
        })
    },

    getAll(actualPage, paginationSize, email, surname) {
        const hashEmail = email

        let url = `developers/get?page=${actualPage - 1}&pagSize=${paginationSize}`
        if (surname && email) {
            url = `developers/get?surname=${titleItemsChange(surname)}&email=${hashEmail}&page=${actualPage - 1}&pagSize=${paginationSize}`
        } else if (surname) {
            url = `developers/get?surname=${titleItemsChange(surname)}&page=${actualPage - 1}&pagSize=${paginationSize}`
        } else if (email) {
            url = `developers/get?email=${hashEmail}&page=${actualPage - 1}&pagSize=${paginationSize}`
        }
        return request.get(url)
    },

    getById(id) {
        return request.get(`developers/get/${id}`)
    },

    getByTask(taskId, page, pagSize, email, surname) {
        const hashEmail = email

        let url = `developers/get_by_task/${taskId}?page=${page - 1}&pagSize=${pagSize}`
        if (surname && email) {
            url = `developers/get_by_task/${taskId}?surname=${titleItemsChange(surname)}&email=${hashEmail}&page=${page - 1}&pagSize=${pagSize}`
        } else if (surname) {
            url = `developers/get_by_task/${taskId}?surname=${titleItemsChange(surname)}&page=${page - 1}&pagSize=${pagSize}`
        } else if (email) {
            url = `developers/get_by_task/${taskId}?email=${hashEmail}&page=${page - 1}&pagSize=${pagSize}`
        }
        return request.get(url)
    },

    getByProject(projectId, page, pagSize, email, surname) {
        const hashEmail = email

        let url = `developers/get_by_project/${projectId}?page=${page - 1}&pagSize=${pagSize}`
        if (surname && email) {
            url = `developers/get_by_project/${projectId}?surname=${titleItemsChange(surname)}&email=${hashEmail}&page=${page - 1}&pagSize=${pagSize}`
        } else if (surname) {
            url = `developers/get_by_project/${projectId}?surname=${titleItemsChange(surname)}&page=${page - 1}&pagSize=${pagSize}`
        } else if (email) {
            url = `developers/get_by_project/${projectId}?email=${hashEmail}&page=${page - 1}&pagSize=${pagSize}`
        }
        return request.get(url)
    },

    updateDeveloper(id, developerData) {
        return request.post(`developers/update/${id}`, {
            ...developerData,
            name: titleItemsChange(developerData.name),
            surname: titleItemsChange(developerData.surname),
            patronymic: titleItemsChange(developerData.patronymic),
            password: encodeURIComponent(cryptoJS.AES.encrypt(developerData.password, keyForPasswords).toString())
        })
    },

    deleteDeveloper(id) {
        return request.get(`developers/delete/${id}`)
    },

    putDeveloper(developerData) {
        return request.post('developers/put', {
            ...developerData,
            name: titleItemsChange(developerData.name),
            surname: titleItemsChange(developerData.surname),
            patronymic: titleItemsChange(developerData.patronymic),
            password: encodeURIComponent(cryptoJS.AES.encrypt(developerData.password, keyForPasswords).toString())
        })
    },

    getDevelopersCount(email, surname) {
        const hashEmail = email
        let url = 'developers/count'
        if (surname && email) {
            url = `developers/count?surname=${titleItemsChange(surname)}&email=${hashEmail}`
        } else if (surname) {
            url = `developers/count?surname=${titleItemsChange(surname)}`
        } else if (email) {
            url = `developers/count?email=${hashEmail}`
        }
        return request.get(url)
    },

    getDevelopersCountByTask(taskId, email, surname) {

        const hashEmail = email
        let url = `developers/count_by_task/${taskId}`
        if (surname && email) {
            url = `developers/count_by_task/${taskId}?surname=${titleItemsChange(surname)}&email=${hashEmail}`
        } else if (surname) {
            url = `developers/count_by_task/${taskId}?surname=${titleItemsChange(surname)}`
        } else if (email) {
            url = `developers/count_by_task/${taskId}?email=${hashEmail}`
        }
        return request.get(url)
    },

    getDevelopersCountByProject(projectId, email, surname) {
        const hashEmail = email
        let url = `developers/count_by_project/${projectId}`
        if (surname && email) {
            url = `developers/count_by_project/${projectId}?surname=${titleItemsChange(surname)}&email=${hashEmail}`
        } else if (surname) {
            url = `developers/count_by_project/${projectId}?surname=${titleItemsChange(surname)}`
        } else if (email) {
            url = `developers/count_by_project/${projectId}?email=${hashEmail}`
        }
        return request.get(url)
    },

    async checkEmail(email, id) {
        const hashEmail = email
        let url = `developers/checkEmail/${hashEmail}/${id}`
        return (await request.get(url)).data
    },

    async checkByDeveloper(email) {
        const hashEmail = email
        let url = `developers/check-by-developer/${hashEmail}`
        return (await request.get(url)).data
    },

    async changeAvatar(id, file) {

        const fd = new FormData()
        fd.append('image', file, `${Date.now()}_${file.name}`)

        let url = `${config.SERVER_ADDRESS}developers/put-avatar/${id}`

        //Используется нативный fetch из-за несовместимости библиотеки multer(для работы с изображением) и axios
        return fetch(url, {
            method: 'POST',
            body: fd
        })
    }
}

export const notificationsAPI = {

    getAllNotifications(page, pagSize) {
        const url = `notifications/get_all?page=${page - 1}&pagSize=${pagSize}`
        return request.get(url)
    },

    getDevelopersNotifications(developerId, page, pagSize) {
        const url = `notifications/get_by_developer/${developerId}?page=${page - 1}&pagSize=${pagSize}`
        return request.get(url)
    },

    getAllNotificationsCount() {
        const url = 'notifications/all_count'
        return request.get(url)
    },

    getDevelopersNotificationsCount(developerId) {
        const url = `notifications/count_by_developer/${developerId}`
        return request.get(url)
    },

    getNotificationsByTaskId(taskId, page, pagSize) {
        const url = `notifications/get/${taskId}?page=${page - 1}&pagSize=${pagSize}`
        return request.get(url)
    },

    getNotificationsCountByTaskId(taskId) {
        const url = `notifications/count/${taskId}`
        return request.get(url)
    },

    deleteNotification(notificationId) {
        const url = `notifications/delete/${notificationId}`
        return request.get(url)
    },

    putNotification(sender, content, date, taskId) {
        const url = `notifications/put_notification`
        return request.post(url, {
            sender,
            content,
            date,
            taskId
        })
    },

    updateNotification(notificationId, content) {
        const url = `notifications/update_notification/${notificationId}`
        return request.post(url, {content})
    }
}

export const tasksAPI = {
    getTasksByDeveloperId(developerId, isAdmin) {
        const url = isAdmin
            ? `tasks/get_all`
            : `tasks/get_by_developer/${developerId}`
        return request.get(url)
    },

    getTasks(projectId, title, page, pagSize) {
        const url = title
            ? `tasks/get/${projectId}?title=${title}&page=${page - 1}&pagSize=${pagSize}`
            : `tasks/get/${projectId}?page=${page - 1}&pagSize=${pagSize}`

        return request.get(url)
    },
    getDevelopersTasks(projectId, title, page, pagSize, developerId) {
        const url = title
            ? `tasks/get/${projectId}?developerId=${developerId}&title=${title}&page=${page - 1}&pagSize=${pagSize}`
            : `tasks/get/${projectId}?developerId=${developerId}&page=${page - 1}&pagSize=${pagSize}`

        return request.get(url)

    },

    getTask(taskId) {
        const url = `tasks/get_single/${taskId}`

        return request.get(url)
    },

    getCount(projectId, title) {
        const url = title
            ? `tasks/count/${projectId}?title=${title}`
            : `tasks/count/${projectId}`

        return request.get(url)
    },
    getDevelopersTasksCount(projectId, title, developerId) {
        const url = title
            ? `tasks/count/${projectId}?developerId=${developerId}&title=${title}`
            : `tasks/count/${projectId}?developerId=${developerId}`

        return request.get(url)
    },

    deleteTask(taskId) {
        const url = `tasks/delete/${taskId}`

        return request.get(url)
    },

    updateTask(taskId, title, description, results, leadId) {
        const url = `tasks/update/${taskId}`
        return request.post(url, {
            title,
            description,
            results,
            leadId
        })
    },

    putTask(title, description, results, actualDeadline, plannedDeadline, leadId, projectId) {
        const url = `tasks/put`

        return request.post(url, {
            title,
            description,
            results,
            actualDeadline,
            plannedDeadline,
            leadId,
            projectId
        })
    },

    deleteDeveloperFromTask(taskId, developerId) {
        const url = `tasks/delete_developer/${taskId}/${developerId}`
        return request.get(url)
    },

    putDeveloperToTask(taskId, developerId) {
        const url = `tasks/add_developer`
        return request.post(url, {
            taskId,
            developerId
        })
    }
}

export const achAPI = {
    getByDeveloperId(developerId, page, pageSize) {
        const url = `achievements/get_by_developer/${developerId}?page=${page}&pagSize=${pageSize}`
        return request.get(url)
    },

    getAllPossibleAch(page, pageSize) {
        const url = `achievements/get?page=${page}&pagSize=${pageSize}`
        return request.get(url)
    },

    addAch(title, description) {
        const url = `achievements/put`
        return request.post(url, {
            title,
            description
        })
    },

    deleteAch(achId) {
        const url = `achievements/delete/${achId}`
        return request.get(url)
    },

    updateAch(achId, title, description) {
        const url = `achievements/update/${achId}`
        return request.post(url, {
            title,
            description
        })
    },

    updateImg(achId, img) {
        const fd = new FormData()
        fd.append('image', img, `${Date.now()}_${img.name}`)
        let url = `${config.SERVER_ADDRESS}achievements/change_img/${achId}`

        return fetch(url, {
            method: 'POST',
            body: fd
        })
    }
}