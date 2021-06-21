import DevelopersSide from '../../../../../developers/DevelopersSide'
import * as selectors from '../../../../../../../../redux/selectors'
import {getDevelopersByTask, getCountByTask} from '../../../../../../../../redux/reducers/developers_reducer'
import {deleteDeveloperFromTask, addDeveloperToTask} from '../../../../../../../../redux/reducers/tasks_reducer'
import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {developersAPI} from '../../../../../../../../api'
import TaskParticipantsAddForm from './TaskParticipantsAddForm'


function TaskParticipantsContainer(props) {

    const taskId = props.match.params.task_id
    const actualProjectId = props.match.params.id

    const {
        totalDevelopersCount,
        paginationSize,
        developersList,
        getDevelopersByTask,
        getCountByTask,
        deleteDeveloperFromTask,
        addDeveloperToTask,
        history,
        accessRights
    } = props

    function deleteDeveloperAction(developerId) {
        return deleteDeveloperFromTask(taskId, developerId)
    }

    function onSubmitAddDeveloperCreator(setLoading) {
        return async (values) => {
            try {
                setLoading(true)
                const devId = (await developersAPI.checkByDeveloper(values.developerEmail)).id
                if(devId) {
                    await addDeveloperToTask(taskId, devId)
                    await getCountByTask(taskId)
                    await getCountByTask(taskId)
                    history.push(`/single_project/${actualProjectId}/tasks/single_task/${taskId}/tasks_participants/1`)
                } else {
                    alert(`Developer with email ${values.developerEmail} not found`)
                }
            } catch (err) {
                console.log(err)
                alert(err.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return <DevelopersSide
        totalDevelopersCount={totalDevelopersCount}
        paginationSize={paginationSize}
        developersList={developersList}
        getDevelopers={(page, email, surname) => getDevelopersByTask(taskId, page, email, surname)}
        getTotalCount={(email, surname) => getCountByTask(taskId, email, surname)}
        AddDeveloper={TaskParticipantsAddForm}
        rootPath={`/single_project/${actualProjectId}/tasks/single_task/${taskId}/tasks_participants/`}
        deleteDeveloperAction={deleteDeveloperAction}
        onSubmitAddDeveloperCreator={onSubmitAddDeveloperCreator}
        accessRights={accessRights}
    />
}

function mapStateToProps(state) {
    return {
        totalDevelopersCount: selectors.totalDevelopersCountSelector(state),
        paginationSize: selectors.paginationSizeDevelopersSelector(state),
        developersList: selectors.developersListSelector(state)
    }
}
export default connect(mapStateToProps, {

    getDevelopersByTask,
    getCountByTask,
    deleteDeveloperFromTask,
    addDeveloperToTask

})(withRouter(TaskParticipantsContainer))