import React from 'react'
import {NavLink} from 'react-router-dom'
import SingleDeveloper from '../../../../../developers/developer/Developer'
import ChangingDatesContainer from './changing_dates/ChangingDatesContainer'
import * as style from './task_info_style.module.css'
import {dateTimeStringFormat} from '../../../../../../../utils/formats'

export default function TaskInfo(props) {
    const {
        actualTask,
        deleteTask,
        actualProjectId,
        changingDatesList,
        deleteChangingDate,
        putChangingDate,
        updateChangingDate,
        setLoadingParent,
        getChangingDates,
        getSingleTask,
        accessRights
    } = props
    return (
        <div className={style.main_wrapper}>
            <h1>{actualTask.task_title}</h1>
            <div className={style.flex_wrapper}>
                <div className={style.flex_content}>
                    <p className={style.description}>
                        {actualTask.task_description ? actualTask.task_description : 'No description yet' }
                    </p>
                    <h2>Leader: <span>{actualTask.lead ? null : 'no leader yet'}</span></h2>
                    {
                        !actualTask.lead
                            ? null
                            : <SingleDeveloper
                                email={actualTask.lead.developer_email}
                                surname={actualTask.lead.developer_surname}
                                avatarURL={actualTask.lead.developer_avatar_url}
                                id={actualTask.lead.developer_id}
                                name={actualTask.lead.developer_name}
                            />
                    }
                    <h2>Results: <span>{actualTask.task_results ? null : 'no results yet'}</span></h2>
                    <p className={style.results}>
                        {actualTask.task_results ? '\n' + actualTask.task_results : null }
                    </p>
                </div>
                {
                    accessRights
                        ? <div className={style.flex_actions}>
                            <NavLink
                                to={`/single_project/${actualProjectId}/tasks/single_task/${actualTask.task_id}/change_task`}
                                className='primary-btn'>
                                Change task
                            </NavLink>
                            <button className='primary-btn' onClick={() => deleteTask(actualTask.task_id)}>Delete</button>
                        </div>
                        : null
                }
            </div>
            <p className={style.deadline}>
                Actual until: {dateTimeStringFormat(actualTask.task_actual_deadline)}
            </p>
            <p className={style.deadline}>
                Planned until: {dateTimeStringFormat(actualTask.task_planned_deadline)}
            </p>
            <ChangingDatesContainer
                actualTaskId={actualTask.task_id}
                changingDatesList={changingDatesList}
                deleteChangingDate={deleteChangingDate}
                putChangingDate={putChangingDate}
                updateChangingDate={updateChangingDate}
                setLoadingParent={setLoadingParent}
                actualDeadline={actualTask.task_actual_deadline}
                getChangingDates={getChangingDates}
                getSingleTask={getSingleTask}
                accessRights={accessRights}
            />
        </div>
    )
}