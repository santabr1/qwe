import {NavLink, Redirect} from 'react-router-dom'
import Loader from '../../../../../../utils_components/Loader'
import TasksSearchForm from './TasksSearchForm'
import Task from './single_task/SingleTask'
import Pagination from '../../../../../../utils_components/pagination/Pagination'
import React from 'react'
import * as style from './all_tasks.module.css'


export default function AllTasks(props) {
    const {
        page,
        totalPagesCount,
        totalTasksCount,
        projectId,
        loading,
        accessRights,
        tasksList,
        pagSize,
        onSubmitSearchTasks,
    } = props

    //Второе условие для отлова частного случая, при котором мы не найдем ни одного проекта при поиске
    //но при этом редирект не нужен
    if ((page > totalPagesCount || page < 1) && !(totalTasksCount === 0  && page === 1))
        return <Redirect to={`/single_project/${projectId}/tasks/all_tasks/1`}/>

    if(loading)
        return <Loader/>

    else
        return (
            <>
                <div className={style.tasks_actions_wrapper}>
                    <TasksSearchForm
                        onSubmitSearchTasks={onSubmitSearchTasks}
                    />
                    {
                        accessRights
                            ? <NavLink to={`/single_project/${projectId}/tasks/put_task`} className='primary-btn'>Add task</NavLink>
                            : null
                    }

                </div>
                <div className='founded'>
                    Tasks found:&nbsp;<span>{totalTasksCount}</span>
                </div>
                <div className={style.all_tasks_wrapper}>
                    {
                        tasksList.map(task => <Task
                            id={task.task_id}
                            title={task.task_title}
                            lead={task.lead}
                            description={task.task_description}
                            actualDeadline={task.task_actual_deadline}
                            plannedDeadline={task.task_planned_deadline}
                            projectId={projectId}
                        />)
                    }
                </div>
                {
                    totalPagesCount > 1
                        ? <Pagination
                            rootValue={`/single_project/${projectId}/tasks/all_tasks/`}
                            paginationSize={pagSize}
                            totalCount={totalTasksCount}
                        />
                        : null
                }
            </>
        )
}