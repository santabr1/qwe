import {tasksAPI, changingDatesAPI} from '../../api/index'
import {successResponseCondition} from '../utils/index'

const SET_TASKS_LIST = 'SET_TASKS_LIST'
const SET_ACTUAL_TASK = 'SET_ACTUAL_TASK'
const SET_TOTAL_TASKS_COUNT = 'SET_TOTAL_TASKS_COUNT'
const SET_CHANGING_DATES_LIST = 'SET_CHANGING_DATES_LIST'

const defaultState = {
    tasksList: [],
    actualTask: null,
    paginationSize: 6,
    totalTasksCount: null,
    changingDatesList: []
}

export default function tasksReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_TOTAL_TASKS_COUNT): {
            return {
                ...state,
                totalTasksCount: action.newTotalCount
            }
        }
        case(SET_TASKS_LIST): {
            return {
                ...state,
                tasksList: action.newTasksList
            }
        }
        case(SET_ACTUAL_TASK): {
            return {
                ...state,
                actualTask: action.newActualTask
            }
        }
        case(SET_CHANGING_DATES_LIST): {
            return {
                ...state,
                changingDatesList: action.newChangingDatesList
            }
        }
        default: {
            return state
        }
    }
}

function setTasksListAC(newTasksList) {
    return {
        type: SET_TASKS_LIST,
        newTasksList
    }
}

function setActualTaskAC(newActualTask) {
    return {
        type: SET_ACTUAL_TASK,
        newActualTask
    }
}

function setTotalTasksCountAC(newTotalCount) {
    return {
        type: SET_TOTAL_TASKS_COUNT,
        newTotalCount
    }
}

function setChangingDatesListAC(newChangingDatesList) {
    return {
        type: SET_CHANGING_DATES_LIST,
        newChangingDatesList
    }
}

export function getTasks(projectId, page, title) {
    return async (dispatch, getState) => {
        const response = await tasksAPI.getTasks(projectId, title, page, getState().tasks.paginationSize)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTasksListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getDevelopersTasks(projectId, page, developerId, title) {
    return async (dispatch, getState) => {
        const response = await tasksAPI.getDevelopersTasks(projectId, title, page, getState().tasks.paginationSize, developerId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTasksListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getAllDevelopersTasks(developerId, isAdmin) {
    return async (dispatch, getState) => {
        debugger
        const response = await tasksAPI.getTasksByDeveloperId(developerId, isAdmin)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getSingleTask(taskId) {
    return async dispatch => {
        const response = await tasksAPI.getTask(taskId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setActualTaskAC(response.data[0]))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getTotalTasksCount(projectId, title) {
    return async dispatch => {
        const response = await tasksAPI.getCount(projectId, title)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalTasksCountAC(response.data[0]['COUNT(*)']))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getTotalDevelopersTasksCount(projectId, developerId, title) {
    return async dispatch => {
        const response = await tasksAPI.getDevelopersTasksCount(projectId, title, developerId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalTasksCountAC(response.data[0]['COUNT(*)']))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteTask(taskId) {
    return async dispatch => {
        const response = await tasksAPI.deleteTask(taskId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateTask(taskId, title, description, results, leadId) {
    return async dispatch => {
        const response = await tasksAPI.updateTask(taskId, title, description, results, leadId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function putTask(title, description, results, actualDeadline, plannedDeadline, leadId, projectId) {
    return async dispatch => {
        const response = await tasksAPI.putTask(title, description, results, actualDeadline, plannedDeadline, leadId, projectId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getChangingDates(taskId) {
    return async dispatch => {
        const response = await changingDatesAPI.getAll(taskId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setChangingDatesListAC(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteChangingDate(changingDateId) {
    return async dispatch => {
        const response = await changingDatesAPI.deleteChangingDate(changingDateId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function putChangingDate(cause, deadlineBefore, deadlineAfter, taskId) {
    return async dispatch => {
        const response = await changingDatesAPI.putChangingDate(cause, deadlineBefore, deadlineAfter, taskId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateChangingDate(changingDateId, cause) {
    return async dispatch => {
        const response = await changingDatesAPI.updateChangingDate(changingDateId, cause)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function addDeveloperToTask(taskId, developerId) {
    return async dispatch => {
        const response = await tasksAPI.putDeveloperToTask(taskId, developerId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteDeveloperFromTask(taskId, developerId) {
    return async dispatch => {
        const response = await tasksAPI.deleteDeveloperFromTask(taskId, developerId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
