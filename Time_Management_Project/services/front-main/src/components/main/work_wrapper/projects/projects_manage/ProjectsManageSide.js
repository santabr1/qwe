import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {developersAPI} from '../../../../../api/index'
import ProjectsManage from './ProjectsManage'

function ProjectsManageSide(props) {
    const {
        match,
        actualProject,
        getProjectById,
        deleteProject,
        history,
        location,
        changeProject,
        accessRights,
        putTask
    } = props

    const [loading, setLoading] = useState(true)
    const id = +match.params.id

    //Флаг существования запрашиваемого проекта
    let [existsFlag, setExistsFlag] = useState(true)

    //Данные для WorkWithProjectForm (в данном случае изменение проекта)
    function initialValuesChangeProject(actualProject) {
        return {
            title: actualProject.project_title,
            description: actualProject.project_description,
            deadline: actualProject.project_deadline.slice(0, actualProject.project_deadline.indexOf('T')),
            projectLeadEmail: actualProject.lead ? actualProject.lead.developer_email : ''
        }
    }
    async function onSubmitChangeProject(values, setLoading) {
        try {
            setLoading(true)

            //Если поле лидера не пустое => проверка на то, что он не явялется администратором
            //и вообще существует
            if(values.projectLeadEmail) {
                const leadId = (await developersAPI.checkByDeveloper(values.projectLeadEmail)).id
                if(leadId) {
                    await changeProject(actualProject.project_id, values.title, values.description, values.deadline, leadId)
                    history.push('/projects/1')
                } else {
                    alert(`Developer with email ${values.projectLeadEmail} not found`)
                }
            } else {
                await changeProject(actualProject.project_id, values.title, values.description, values.deadline, '')
                history.push('/projects/1')
            }
        } catch (err) {
            console.log(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    //Данные для настройки WorkWithTasksForm (put project)
    const initialValuesPutTask =  {
        title: '',
        description: '',
        results: '',
        planned_deadline_date: '',
        planned_deadline_time: '',
        taskLeadEmail: ''
    }
    async function onSubmitPutTask(values, setLoading) {
        try {
            setLoading(true)

            //Если поле лидера не пустое => проверка на то, что он не явялется администратором
            //и вообще существует
            if(values.taskLeadEmail) {
                const leadId = (await developersAPI.checkByDeveloper(values.taskLeadEmail)).id
                if(leadId) {
                    await putTask(
                        values.title,
                        values.description,
                        values.results,
                        `${values.planned_deadline_date} ${values.planned_deadline_time}`,
                        `${values.planned_deadline_date} ${values.planned_deadline_time}`,
                        leadId,
                        id
                    )
                    history.push(`/single_project/${id}/tasks/all_tasks/1`)
                } else {
                    alert(`Developer with email ${values.taskLeadEmail} not found`)
                }
            } else {
                await putTask(
                    values.title,
                    values.description,
                    values.results,
                    `${values.planned_deadline_date} ${values.planned_deadline_time}`,
                    `${values.planned_deadline_date} ${values.planned_deadline_time}`,
                    '',
                    id
                )
                history.push(`/single_project/${id}/tasks/all_tasks/1`)
            }
        } catch (err) {
            console.log(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    function deleteAction(id) {
        // eslint-disable-next-line no-restricted-globals
        const choice = confirm(`Are you sure to delete project "${actualProject.project_title}"?`)
        if(choice) {
            setLoading(true)
            deleteProject(id)
                .then(() => history.push('/projects/1'))
                .catch(err => {
                    if(err) {
                        console.log(err)
                        alert(err.message)
                    }
                })
                .finally(() => setLoading(false))
        }

    }

    useEffect(() => {

        getProjectById(id)
            .catch(err => {
                setExistsFlag(false)
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    return <ProjectsManage
        existsFlag={existsFlag}
        loading={loading}
        location={location}
        id={id}
        actualProject={actualProject}
        deleteAction={deleteAction}
        accessRights={accessRights}
        onSubmitChangeProject={onSubmitChangeProject}
        initialValuesChangeProject={initialValuesChangeProject}
        initialValuesPutTask={initialValuesPutTask}
        onSubmitPutTask={onSubmitPutTask}
    />
}

export default withRouter(ProjectsManageSide)



