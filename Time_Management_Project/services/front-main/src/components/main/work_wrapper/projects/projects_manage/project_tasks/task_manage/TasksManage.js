import {NavLink, Redirect, Route} from 'react-router-dom'
import Loader from '../../../../../../utils_components/Loader'
import TaskParticipantsContainer from './tasks_participants/TaskParticipantsContainer'
import WorkWithTaskForm from '../../work_with_task_form/WorkWithTaskForm'
import React from 'react'
import * as style from './tasks_manage.module.css'
import NotificationsContainer from '../../../../notifications/AllNotificationsContainer'
import TaskInfo from "./task_info/TaskInfo";


export default function TasksManage(props) {
    const {
        existsFlag,
        actualProjectId,
        loading,
        actualTask,
        accessRights,
        initialValuesChangeTask,
        onSubmitChangeTask,
        location,
        changingDatesList,
        deleteChangingDate,
        getChangingDates,
        putChangingDate,
        updateChangingDate,
        deleteTaskAction,
        getSingleTask,
        setLoading
    } = props

    if(!existsFlag)
        return <Redirect to={`/single_project/${actualProjectId}/tasks/all_tasks/1`}/>
    if(loading)
        return <Loader />
    return (
        <div>
            <div className={style.tasks_nav}>
                <ul>

                    <NavLink
                        to={`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/task_info`}
                        className={location.pathname.includes('change_task') ? 'active' : ''}
                    >
                        <li>
                            {
                                actualTask.task_title.length > 30
                                    ? actualTask.task_title.slice(0, 30) + '...'
                                    : actualTask.task_title
                            }
                        </li>
                    </NavLink>
                    <NavLink
                        to={`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/tasks_notifications/1`}
                        className={location.pathname.includes('/tasks_notifications/') ? 'active' : ''}
                    >
                        <li>
                            Notifications
                        </li>
                    </NavLink>


                    <NavLink
                        to={`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/tasks_participants/1`}
                        className={location.pathname.includes('/tasks_participants/') ? 'active' : ''}
                    >
                        <li>
                            Participants
                        </li>
                    </NavLink>

                </ul>
            </div>
            <div className='projects_manage_work_space'>
                <Route
                    path={`/single_project/:id?/tasks/single_task/:task_id?/task_info`}
                    render={() => <TaskInfo
                        deleteTask={deleteTaskAction}
                        actualTask={actualTask}
                        actualProjectId={actualProjectId}
                        deleteChangingDate={deleteChangingDate}
                        putChangingDate={putChangingDate}
                        updateChangingDate={updateChangingDate}
                        changingDatesList={changingDatesList}
                        setLoadingParent={setLoading}
                        getChangingDates={getChangingDates}
                        getSingleTask={getSingleTask}
                        accessRights={accessRights}
                    />}
                />
                <Route
                    path={`/single_project/:id?/tasks/single_task/:task_id?/tasks_notifications/:page?`}
                    render={() => <NotificationsContainer
                        accessRights={false}
                        taskId={actualTask.task_id}
                        rootPath={`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/tasks_notifications/`}
                    />}
                />
                <Route
                    path={`/single_project/:id?/tasks/single_task/:task_id?/tasks_participants/:page?`}
                    render={() => <TaskParticipantsContainer
                        accessRights={accessRights}
                    />}
                />
                <Route
                    path={`/single_project/:id?/tasks/single_task/:task_id?/change_task`}
                    render={
                        accessRights

                            ? () => <WorkWithTaskForm
                                action={'Change'}
                                projectId={actualProjectId}
                                actualTask={actualTask}
                                initialValues={initialValuesChangeTask}
                                onSubmit={onSubmitChangeTask}
                                location={location}/>

                            : () => <Redirect to={'/profile'}/>
                    }
                />
            </div>
        </div>
    )
}