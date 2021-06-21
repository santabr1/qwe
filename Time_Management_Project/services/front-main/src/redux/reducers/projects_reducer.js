import {projectsAPI, developersAPI} from '../../api'
import {successResponseCondition} from '../utils'

const SET_PROJECTS_LIST = 'SET_PROJECTS_LIST'
const SET_TOTAL_PROJECTS_COUNT = 'SET_TOTAL_PROJECTS_COUNT'
const SET_ACTUAL_PROJECT = 'SET_ACTUAL_PROJECT'

const defaultState = {
    projectsList: [],
    totalProjectsCount: null,
    paginationSize: 4,
    actualProject: null
}

export default function projectReducer(state = defaultState, action) {
    switch (action.type) {
        case (SET_PROJECTS_LIST): {
            return {
                ...state,
                projectsList: action.newProjectsList
            }
        }
        case (SET_TOTAL_PROJECTS_COUNT): {
            return {
                ...state,
                totalProjectsCount: action.projectsCount
            }
        }
        case (SET_ACTUAL_PROJECT) : {
            return {
                ...state,
                actualProject: action.actualProjectObject
            }
        }
        default: {
            return state
        }
    }
}

function setProjectsList(newProjectsList) {
    return {
        type: SET_PROJECTS_LIST,
        newProjectsList
    }
}
function setTotalProjectsCount(projectsCount) {
    return {
        type: SET_TOTAL_PROJECTS_COUNT,
        projectsCount
    }
}
function setActualProject(actualProjectObject) {
    return {
        type: SET_ACTUAL_PROJECT,
        actualProjectObject
    }
}


export function getProjectsCount(title) {
    return async (dispatch) => {
        const response = await projectsAPI.getProjectsCount(title)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalProjectsCount(response.data[0]['COUNT(*)']))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getDevelopersProjectsCount(title, developerId) {
    return async (dispatch) => {
        const response = await projectsAPI.getDevelopersProjectCount(developerId, title)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            dispatch(setTotalProjectsCount(response.data[0]['COUNT(*)']))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getProjects(page, title) {
    return async (dispatch, getState) => {
        const response = await projectsAPI.getProjects(page, getState().projects.paginationSize, title)
        if(successResponseCondition(response.status, response.data.errMessage)) {

            //Раскрытие данных лидеров проектов из id лидеров
            for(let project of response.data) {
                if(project.project_lead_id) {
                    const lead = await developersAPI.getById(project.project_lead_id)
                    if(successResponseCondition(lead.status, lead.data.errMessage))
                        project.lead = lead.data[0]
                    else
                        return Promise.reject(new Error('No data of lead'))
                }
            }
            dispatch(setProjectsList(response.data))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}
export function getDevelopersProjects(page, title, developerId) {
    return async (dispatch, getState) => {
        const response = await projectsAPI.getDevelopersProjects(page, getState().projects.paginationSize, developerId, title)
        if(successResponseCondition(response.status, response.data.errMessage)) {

            //Раскрытие данных лидеров проектов из id лидеров
            for(let project of response.data) {
                if(project.project_lead_id) {
                    const lead = await developersAPI.getById(project.project_lead_id)
                    if(successResponseCondition(lead.status, lead.data.errMessage))
                        project.lead = lead.data[0]
                    else
                        return Promise.reject(new Error('No data of lead'))
                }
            }
            dispatch(setProjectsList(response.data))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function getProjectById(id) {
    return async dispatch => {
        const response = await projectsAPI.getProjectById(id)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            if(response.data[0]) {

                //Получение лидера проекта из его id и добавление данных о нем
                if(response.data[0].project_lead_id) {
                    const lead = await developersAPI.getById(response.data[0].project_lead_id)
                    if(successResponseCondition(lead.status, lead.data.errMessage))
                        response.data[0].lead = lead.data[0]
                    else
                        return Promise.reject(new Error(response.data.errMessage))
                }

                dispatch(setActualProject(response.data[0]))
            } else
                return Promise.reject(new Error('No data of lead'))
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function putProject(title, description, deadline, leadId) {
    return async dispatch => {
        const response = await projectsAPI.putProject(title, description, deadline, leadId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function deleteProject(id) {
    return async dispatch => {
        const response = await projectsAPI.deleteProject(id)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export function changeProject(id, title, description, deadline, leadId) {
    return async dispatch => {
        const response = await projectsAPI.changeProject(id, title, description, deadline, leadId)
        if(successResponseCondition(response.status, response.data.errMessage)) {
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}