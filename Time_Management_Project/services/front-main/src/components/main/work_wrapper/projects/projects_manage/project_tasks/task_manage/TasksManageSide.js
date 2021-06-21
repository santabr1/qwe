import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {developersAPI} from '../../../../../../../api'
import TasksManage from './TasksManage'

function TaskManageSide(props) {

    const {
        actualTask,
        match,
        getSingleTask,
        deleteTask,
        history,
        updateTask,
        accessRights,
        deleteChangingDate,
        getChangingDates,
        putChangingDate,
        updateChangingDate,
        changingDatesList,
        location
    } = props

    const actualProjectId = match.params.id
    const actualTaskId = match.params.task_id

    const [loading, setLoading] = useState(true)
    const [existsFlag, setExistsFlag] = useState(true)

    useEffect(() => {
        getSingleTask(actualTaskId)
            .then(() => getChangingDates(actualTaskId))
            .catch(err => {
                setExistsFlag(false)
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    function deleteTaskAction(taskId) {
        setLoading(true)
        // eslint-disable-next-line no-restricted-globals
        const choice = confirm(`Are you sure to delete task "${actualTask.task_title}"?`)
        if(choice) {
            setLoading(true)
            deleteTask(taskId)
                .then(() => history.push(`/single_project/${actualProjectId}/tasks/all_tasks/1`))
                .catch(err => {
                    if(err) {
                        console.log(err)
                        alert(err.message)
                    }
                })
                .finally(() => setLoading(false))
        }
    }

    //Данные для WorkWithTaskForm (change task)
    const initialValuesChangeTask = actualTask
        ? {
            title: actualTask.task_title,
            description: actualTask.task_description,
            results: actualTask.task_results,
            taskLeadEmail: actualTask.lead ? actualTask.lead.developer_email : ''
        }
        : {
            title: '',
            description: '',
            results: '',
            taskLeadEmail: ''
        }
    async function onSubmitChangeTask(values, setLoading) {
        try {
            setLoading(true)
            //Если поле лидера не пустое => проверка на то, что он не явялется администратором
            //и вообще существует
            if(values.taskLeadEmail) {
                const leadId = (await developersAPI.checkByDeveloper(values.taskLeadEmail)).id
                if(leadId) {
                    await updateTask(
                        actualTask.task_id,
                        values.title,
                        values.description,
                        values.results,
                        leadId
                    )
                    await getSingleTask(actualTask.task_id)
                    history.push(`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/task_info`)
                } else {
                    alert(`Developer with email ${values.taskLeadEmail} not found`)
                }
            } else {
                await updateTask(
                    actualTask.task_id,
                    values.title,
                    values.description,
                    values.results,
                    ''
                )
                await getSingleTask(actualTask.task_id)
                history.push(`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/task_info`)
            }
        } catch (err) {
            console.log(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    return <TasksManage
        existsFlag={existsFlag}
        actualProjectId={actualProjectId}
        loading={loading}
        actualTask={actualTask}
        deleteTaskAction={deleteTaskAction}
        deleteChangingDate={deleteChangingDate}
        putChangingDate={putChangingDate}
        updateChangingDate={updateChangingDate}
        changingDatesList={changingDatesList}
        setLoading={setLoading}
        getChangingDates={getChangingDates}
        getSingleTask={getSingleTask}
        accessRights={accessRights}
        initialValuesChangeTask={initialValuesChangeTask}
        onSubmitChangeTask={onSubmitChangeTask}
        location={location}
    />
}

export default withRouter(TaskManageSide)