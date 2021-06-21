import {workingTimeAPI} from '../../api'
import {successResponseCondition} from '../utils'

const SET_WORKING_TIMES_LIST = 'SET_WORKING_TIMES_LIST'

const defaultState = {
    workingTimeList: []
}
export default function workingTimeReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_WORKING_TIMES_LIST): {
            return {
                ...state,
                workingTimeList: action.workingTimeList
            }
        }
        default: {
            return state
        }
    }
}

export function setWorkingTimeList(workingTimeList) {
    return {
        type: SET_WORKING_TIMES_LIST,
        workingTimeList
    }
}

export function getWorkingTimeFromServByDeveloperIdAndDate(developerId, date) {
    return async dispatch => {
        const response = await workingTimeAPI.getByDeveloperIdAndDates(developerId, date)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteWtOnServ(wtId) {
    return async dispatch => {
        const response = await workingTimeAPI.deleteWt(wtId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateStatusOnServ(wtId, status) {
    return async dispatch => {
        const response = await workingTimeAPI.updateStatus(wtId, status)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function addWtOnServ(developerId, taskId, startTime, endTime, comment) {
    return async dispatch => {
        const response = await workingTimeAPI.addWt(developerId, taskId, startTime, endTime, comment)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getWtFromServFromCalendar(developerId, month, year) {
    return async dispatch => {
        const response = await workingTimeAPI.fillCalendar(developerId, month, year)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}