import {developersAPI} from '../../api'
import {successResponseCondition} from '../utils'

const SET_AUTH_ID = 'SET_AUTH_ID'
const SET_ADMIN_RULES = 'SET_ADMIN_RULES'

const defaultState = {
    authId: null,
    isAdmin: false
}

export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case (SET_ADMIN_RULES): {
            return {
                ...state,
                isAdmin: action.isAdmin
            }
        }
        case (SET_AUTH_ID): {
            return {
                ...state,
                authId: action.authId
            }
        }
        default: {
            return state
        }
    }
}

function setAuthId(authId) {
    return {
        type: SET_AUTH_ID,
        authId
    }
}
function setAdminRulesAC(isAdmin) {
    return {
        type: SET_ADMIN_RULES,
        isAdmin
    }
}

export function logout() {
    return dispatch => {
        dispatch(setAuthId(null))
        dispatch(setAdminRulesAC(false))
    }
}

export function auth(email, pass) {
    return async dispatch => {
        const response = await developersAPI.getAuth(email, pass)

        if(successResponseCondition(response.status, response.data.errMessage)) {
            if(response.data.length !== 0) {
                dispatch(setAuthId(response.data[0].developer_id))
                dispatch(setAdminRulesAC(!!response.data[0].developer_is_admin))
            } else {
                return Promise.reject(new Error('Неверный логин или пароль'))
            }
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}