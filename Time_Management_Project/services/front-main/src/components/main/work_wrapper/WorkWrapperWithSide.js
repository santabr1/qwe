import React from 'react'
import {withRouter} from 'react-router-dom'
import WorkWrapper from './WorkWrapper'
import {developersAPI} from '../../../api'

function WorkWrapperWithSide(props) {
    const {
        isAdmin,
        putProject,
        actualProject,
        getProjectById,
        deleteProject,
        history,
        changeProject,
        location,
        authId,
        putTask,
        putDeveloper
    } = props

    //Данные для настройки WorkWithProjectForm
    function initialValuesPutDeveloper() {
        return {
            title: '',
            description: '',
            deadline: '',
            projectLeadEmail: ''
        }
    }
    async function onSubmitPutProject(values, setLoading) {
        try {
            setLoading(true)

            //Если поле лидера не пустое => проверка на то, что он не явялется администратором
            //и вообще существует
            if(values.projectLeadEmail) {
                const id = (await developersAPI.checkByDeveloper(values.projectLeadEmail)).id
                if(id) {
                    await putProject(values.title, values.description, values.deadline, id)
                    history.push('/projects/1')
                } else {
                    alert(`Developer with email ${values.projectLeadEmail} not found`)
                }
            } else {
                await putProject(values.title, values.description, values.deadline, '')
                history.push('/projects/1')
            }
        } catch (err) {
            console.log(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    function onSubmitPutDeveloper(values) {
        //Проверка на доступность email среди всех пользователей
        //кроме пользователя с id = -1 => среди всех пользователей
        developersAPI.checkEmail(values.email, -1)
            .then(async (response) => {
                if(response.passed) {
                    await putDeveloper(values)
                    history.push('/developers/1')
                } else {
                    alert('This mail belongs to another user')
                }
            })
            .catch((err) => {
                console.log(err)
                alert(err.message);
            })
    }

    return <WorkWrapper
        onSubmitPutProject={onSubmitPutProject}
        onSubmitPutDeveloper={onSubmitPutDeveloper}
        initialValuesPutDeveloper={initialValuesPutDeveloper}
        actualProject={actualProject}
        isAdmin={isAdmin}
        location={location}
        authId={authId}
        getProjectById={getProjectById}
        deleteProject={deleteProject}
        changeProject={changeProject}
        putTask={putTask}
    />
}


export default withRouter(WorkWrapperWithSide)