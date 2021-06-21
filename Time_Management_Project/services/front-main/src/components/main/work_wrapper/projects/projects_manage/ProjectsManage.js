import {NavLink, Redirect, Route} from 'react-router-dom'
import Loader from '../../../../utils_components/Loader'
import ProjectInfo from './project_info/ProjectInfo'

import ParticipantsContainer from './project_participants/ProjectParticipantsContainer'
import WorkWithProjectForm from '../../work_with_project_form/WorkWithProjectForm'

import React from 'react'
import * as style from './projects_manage.module.css'
import WorkWithTaskForm from "./work_with_task_form/WorkWithTaskForm";
import TasksContainer from "./project_tasks/TasksContainer";

export default function ProjectsManage(props) {
    const {
        existsFlag,
        loading,
        location,
        id,
        actualProject,
        deleteAction,
        accessRights,
        onSubmitChangeProject,
        initialValuesChangeProject,
        initialValuesPutTask,
        onSubmitPutTask
    } = props
    if(!existsFlag)
        return <Redirect to='/projects/1'/>
    if(loading)
        return <Loader />
    return (
        <div className={style.projects_manage_wrapper}>
            <div className={style.projects_nav}>
                <ul>
                    <NavLink
                        to={`/single_project/${id}/project_info`}
                        className={location.pathname.includes('change_project') ? 'active' : ''}
                    >
                        <li>
                            {
                                //Обрезка слишком длинных названий проекта
                                actualProject.project_title.length > 15
                                    ? actualProject.project_title.slice(0, 15) + '...'
                                    : actualProject.project_title
                            }
                        </li>
                    </NavLink>
                    <NavLink
                        to={`/single_project/${id}/tasks/all_tasks/1`}
                        className={location.pathname.includes('/tasks/') ? 'active' : ''}
                    ><li>Tasks</li></NavLink>
                    <NavLink
                        to={`/single_project/${id}/project_participants/1`}
                        className={location.pathname.includes('/project_participants/') ? 'active' : ''}
                    >
                        <li>Participants</li>
                    </NavLink>
                </ul>
            </div>
            <div>
                <Route path={`/single_project/:id?/project_info`} render={() => <ProjectInfo
                    actualProject={actualProject}
                    deleteAction={() => deleteAction(id)}
                    accessRights={accessRights}
                />}/>
                <Route path={`/single_project/:id?/tasks/`} render={() => <TasksContainer
                    projectAccessRights={accessRights}
                />}/>
                <Route path={`/single_project/:id?/project_participants/:page?`} render={() => <ParticipantsContainer />}/>
                <Route path={'/single_project/:id?/change_project'} render={
                    accessRights
                        ? () => <WorkWithProjectForm
                            onSubmit={onSubmitChangeProject}
                            initialValues={initialValuesChangeProject}
                            actualProject={actualProject}
                            action={'Change'}
                            location={location}
                            projectId={id}/>

                        : () => <Redirect to={'/profile'}/>
                }/>
                <Route path={'/single_project/:id?/tasks/put_task'} render={
                    accessRights

                        ? () => <WorkWithTaskForm
                            action={'Put'}
                            initialValues={initialValuesPutTask}
                            onSubmit={onSubmitPutTask}
                            projectId={id}
                            location={location}/>

                        : () => <Redirect to={'/profile'}/>
                }/>
            </div>
        </div>
    )
}