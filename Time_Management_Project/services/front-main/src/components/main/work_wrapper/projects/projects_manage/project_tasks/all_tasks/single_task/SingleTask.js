import React from 'react'
import {NavLink} from 'react-router-dom'
import {dateTimeStringFormat} from '../../../../../../../utils/formats'
import * as style from '../all_tasks.module.css'

export default function SingleTask(props) {

    const {
        id,
        title,
        description,
        actualDeadline,
        lead,
        plannedDeadline,
        projectId
    } = props

    return (
        <NavLink to={`/single_project/${projectId}/tasks/single_task/${id}/task_info`}>
            <div className={style.task_item}>
                <h2>{
                    title.length > 15
                        ? title.slice(0, 15) + '...'
                        : title
                }</h2>
                <p className={style.task_item_description}>{
                    description
                        ? description.length > 150
                        ? description.slice(0, 150) + '...'
                        : description
                        : 'No description yet'
                }</p>
                <h3>
                    {
                        lead
                            ? <>Project lead: <span>{lead.developer_name} {lead.developer_surname}</span>
                            </>
                            : <>Project lead: <span>Отсутствует</span></>
                    }
                </h3>
                <p className={style.task_item_planned}>Planned until: <span>{dateTimeStringFormat(plannedDeadline)}</span></p>
                <p className={style.task_item_actual}>Actual until: <span>{dateTimeStringFormat(actualDeadline)}</span></p>
            </div>
        </NavLink>
    )
}