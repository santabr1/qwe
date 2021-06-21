import {developersAPI} from '../../api/index'
import {successResponseCondition} from '../utils'

const SET_PROFILE_INFORMATION = 'SET_PROFILE_INFORMATION'

const defaultState = {
    profileInformation: {}
}

export default function profileReducer(state = defaultState, action) {
    switch (action.type) {
        case (SET_PROFILE_INFORMATION): {
            return {
                ...state,
                profileInformation: {...action.newProfileInformation}
            }
        }
        default: {
            return state
        }
    }
}

function setProfileInformation(newProfileInformation) {
    return {
        type: SET_PROFILE_INFORMATION,
        newProfileInformation
    }
}

export function getProfile(id) {
    return async (dispatch) => {

        const response = await developersAPI.getById(id)

        if(successResponseCondition(response.status, response.data.errMessage)) {
            if(response.data[0]) {
                const candidate = response.data[0]
                dispatch(setProfileInformation({
                    name: candidate.developer_name,
                    surname: candidate.developer_surname,
                    patronymic: candidate.developer_patronymic,
                    position: candidate.developer_position,
                    birth: candidate.developer_birth,
                    avatarURL: candidate.developer_avatar_url,
                    email: candidate.developer_email,
                    password: candidate.developer_password,
                    specialty: candidate.developer_specialty,
                    isAdmin: candidate.developer_is_admin
                }))
            } else {
                return Promise.reject(new Error(response.data.errMessage))
            }
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function changeAvatar(id, file) {
    return async (dispatch) => {
        const response = await developersAPI.changeAvatar(id, file)
        if(successResponseCondition(response.status, response.data?.errMessage)) {
            return dispatch(getProfile(id))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}