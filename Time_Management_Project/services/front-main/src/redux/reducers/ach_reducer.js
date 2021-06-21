import {achAPI} from '../../api'
import {successResponseCondition} from '../utils'

const SET_ACH_LIST = 'SET_ACH_LIST'

const defaultState = {
    achList: [],
    pageSize: 20,
    actualPage: 0
}

export default function achReducer(state = defaultState, action) {
    switch (action.type) {
        case (SET_ACH_LIST): {
            return {
                ...state,
                achList: action.achList
            }
        }
        default: {
            return state
        }
    }
}

function setTasksList(achList) {
    return {
        type: SET_ACH_LIST,
        achList
    }
}

export function getAchFromServerAndSet() {
    return async (dispatch, getState) => {
        const response = await achAPI.getAllPossibleAch(getState().ach.actualPage, getState().ach.pageSize)

        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTasksList(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getAchByDeveloperFromServerAndSet(developerId) {
    return async (dispatch, getState) => {
        const response = await achAPI.getByDeveloperId(developerId, getState().ach.actualPage, getState().ach.pageSize)

        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTasksList(response.data))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function addAchOnServ(title, description) {
    return async (dispatch, getState) => {
        const response = await achAPI.addAch(title, description)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateAchOnServ(achId, title, description) {
    return async (dispatch, getState) => {
        const response = await achAPI.updateAch(achId, title, description)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteAchOnServ(achId) {
    return async (dispatch, getState) => {
        const response = await achAPI.deleteAch(achId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function updateImgOnServ(achId, img) {
    return async (dispatch, getState) => {
        const response = await achAPI.updateImg(achId, img)
        if(successResponseCondition(response.status, response.data?.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}