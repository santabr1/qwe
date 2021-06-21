import React from 'react'
import SingleDeveloper from '../../../developers/developer/Developer'
import {dateStringFormat} from '../../../../../utils/formats'
import {NavLink} from 'react-router-dom'
import * as style from './project_info.module.css'

export default function ProjectInfo(props) {

    const {
        actualProject,
        deleteAction,
        accessRights
    } = props

    return (
        <div className={style.project_info}>
            <h1 className={style.project_title}>{actualProject.project_title}</h1>
            <div className={style.project_info_content}>
                <p className={style.project_description}>
                    {actualProject.project_description || 'No project description'}
                </p>
                <div className={style.project_lead}>
                    <h2>Leader</h2>
                    {
                        actualProject.lead
                            ? <SingleDeveloper
                                id={actualProject.lead.developer_id}
                                surname={actualProject.lead.developer_surname}
                                name={actualProject.lead.developer_name}
                                specialty={actualProject.lead.developer_specialty}
                                position={actualProject.lead.developer_position}
                                avatarURL={actualProject.lead.developer_avatar_url}
                                email={actualProject.lead.developer_email}
                            />
                            : <p>This project does not have a manager yet</p>
                    }
                    {
                        //Действия с проектом могут совершать только лидер и администратор
                        accessRights
                            ? <div className={style.project_actions}>
                                <NavLink
                                    to={`/single_project/${actualProject.project_id}/change_project`}
                                    className='primary-btn'
                                >Change project</NavLink>
                                <button
                                    className='primary-btn'
                                    onClick={deleteAction}
                                >Delete project</button>
                            </div>
                            : null
                    }
                </div>
            </div>
            <p className={style.project_deadline}>Until {dateStringFormat(actualProject.project_deadline)}</p>
        </div>
    )
}