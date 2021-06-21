import {successResponseCondition} from '../utils'
import {notificationsAPI} from '../../api'

const SET_NOTIFICATIONS_LIST = 'SET_NOTIFICATIONS_LIST'
const SET_TOTAL_NOTIFICATIONS_COUNT = 'SET_TOTAL_NOTIFICATIONS_COUNT'

const defaultState = {
    notificationsList: [],
    totalNotificationsCount: null,
    paginationSize: 10
}

export default function notificationsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_NOTIFICATIONS_LIST): {
            return {
                ...state,
                notificationsList: action.newNotificationsList
            }
        }
        case(SET_TOTAL_NOTIFICATIONS_COUNT): {
            return {
                ...state,
                totalNotificationsCount: action.newTotalCount
            }
        }
        default: {
            return state
        }
    }
}

function setNotificationsListAC(newNotificationsList) {
    return {
        type: SET_NOTIFICATIONS_LIST,
        newNotificationsList
    }
}

function setTotalNotificationsCount(newTotalCount) {
    return {
        type: SET_TOTAL_NOTIFICATIONS_COUNT,
        newTotalCount
    }
}

export function getAllNotifications(page) {
    return async (dispatch, getState) => {
        const response = await notificationsAPI.getAllNotifications(page, getState().notifications.paginationSize)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setNotificationsListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getNotificationsByTaskId(taskId, page) {
    return async (dispatch, getState) => {
        const response = await notificationsAPI.getNotificationsByTaskId(taskId, page, getState().notifications.paginationSize)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setNotificationsListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getNotificationsByDeveloperId(developerId, page) {
    return async (dispatch, getState) => {
        const response = await notificationsAPI.getDevelopersNotifications(developerId, page, getState().notifications.paginationSize)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setNotificationsListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getAllNotificationsCount() {
    return async (dispatch) => {
        const response = await notificationsAPI.getAllNotificationsCount()
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalNotificationsCount(response.data[0]['COUNT(*)']))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getNotificationsCountByTaskId(taskId) {
    return async (dispatch) => {
        const response = await notificationsAPI.getNotificationsCountByTaskId(taskId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalNotificationsCount(response.data[0]['COUNT(*)']))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getNotificationsCountByDeveloperId(developerId) {
    return async (dispatch) => {
        const response = await notificationsAPI.getDevelopersNotificationsCount(developerId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalNotificationsCount(response.data[0]['COUNT(*)']))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteNotification(notificationId) {
    return async dispatch => {
        const response = await notificationsAPI.deleteNotification(notificationId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function putNotification(sender, content, date, taskId) {
    return async dispatch => {
        const response = await notificationsAPI.putNotification(
            sender,
            content,
            date,
            taskId
        )
        debugger
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateNotification(notificationId, content) {
    return async dispatch => {
        const response = await notificationsAPI.updateNotification(
            notificationId,
            content
        )
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}



