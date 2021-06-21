import {developersAPI} from '../../api/index'
import {successResponseCondition} from '../utils/index'

const SET_DEVELOPERS_LIST = 'SET_DEVELOPERS_LIST'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'

const defaultState = {
    developersList: [],
    totalDevelopersCount: null,
    paginationSize: 5,

    //Коды справочной сущности для сопоставления кода и его данных
    positionCodes: [
        'Developer',
        'QA Developer',
        'Frontend Developer',
        'Backend Developer',
        'Fullstack Developer',
        'Data scientist',
        'iOS developer',
        'Android developer',
        'System administrator'
    ],
    specialtyCodes: [
        'Trainee',
        'Junior',
        'Middle',
        'Senior',
        'Technical Director'
    ]
}

export default function developersReducer(state = defaultState, action) {
    switch (action.type) {
        case (SET_DEVELOPERS_LIST): {
            return {
                ...state,
                developersList: action.newDevelopersList
            }
        }
        case (SET_TOTAL_COUNT): {
            return {
                ...state,
                totalDevelopersCount: action.newTotalCount
            }
        }
        default: {
            return state
        }
    }
}

function setDevelopersListAC(newDevelopersList) {
    return {
        type: SET_DEVELOPERS_LIST,
        newDevelopersList
    }
}
function setTotalCount(newTotalCount) {
    return {
        type: SET_TOTAL_COUNT,
        newTotalCount
    }
}

export function getDevelopers(actualPage, email, surname) {
    return async (dispatch, getState) => {
        const response = await developersAPI.getAll(actualPage, getState().developers.paginationSize, email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setDevelopersListAC(response.data))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateDeveloper(id, developerData) {
    return async (dispatch) => {
        const response = await developersAPI.updateDeveloper(id, developerData)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteDeveloper(id) {
    return async (dispatch) => {
        const response = await developersAPI.deleteDeveloper(id)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getSingleDeveloperById(id) {
    return async (dispatch) => {
        const response = await developersAPI.getById(id)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function putDeveloper(developerData) {
    return async (dispatch) => {
        const response = await developersAPI.putDeveloper(developerData)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getTotalCount(email, surname) {
    return async (dispatch) => {
        const response = await developersAPI.getDevelopersCount(email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            const totalCount = response.data[0]['COUNT(*)']
            dispatch(setTotalCount(totalCount))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getDevelopersByTask(taskId, page, email, surname) {
    return async (dispatch, getState) => {
        const response = await developersAPI.getByTask(taskId, page, getState().developers.paginationSize, email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setDevelopersListAC(response.data))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getDevelopersByProject(projectId, page, email, surname) {
    return async (dispatch, getState) => {
        const response = await developersAPI.getByProject(projectId, page, getState().developers.paginationSize, email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setDevelopersListAC(response.data))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getCountByTask(taskId, email, surname) {
    return async (dispatch) => {
        const response = await developersAPI.getDevelopersCountByTask(taskId, email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            const totalCount = response.data[0]['COUNT(*)']
            dispatch(setTotalCount(totalCount))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getCountByProject(projectId, email, surname) {
    return async (dispatch) => {
        const response = await developersAPI.getDevelopersCountByProject(projectId, email, surname)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            const totalCount = response.data[0]['COUNT(*)']
            dispatch(setTotalCount(totalCount))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getSubordinatesFromServ(developerId, isAdmin) {
    return async (dispatch) => {
        const response = await developersAPI.getSubordinates(developerId, isAdmin)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return response.data
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
