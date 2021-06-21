import React from 'react'
import {NavLink} from 'react-router-dom'
import {dateStringFormat} from '../../../../../utils/formats'
import * as style from '../all_projects.module.css'

export default function SingleProject(props) {
    const {
        id,
        title,
        description,
        deadline,
        projectLead
    } = props

    return (
        <NavLink to={`/single_project/${id}/project_info`}>

            {/*  Если дата меньше, чем настоящее время, то проект просрочен */}
            <div className={`${style.project_item} ${Date.parse(deadline) < Date.now() ? style.expired : ''}`}>
                <h2>{title}</h2>
                <p className={style.description}>
                    {
                        description
                            ? description.length > 175 ? description.slice(0, 175) + '...' : description
                            : 'Описание отсутствует'
                    }
                </p>
                <div>
                    {
                        projectLead
                            ?   <>
                                <h3>Project lead: <span className={style.project_lead_name}>{projectLead.developer_name} {projectLead.developer_surname}</span></h3>
                                <p>{projectLead.developer_position} {projectLead.developer_specialty}</p>
                                <p>{projectLead.developer_email}</p>
                            </>
                            : <h3>Project lead: <span className={style.project_lead_name}>Отсутствует</span></h3>
                    }
                </div>
                <p className={style.deadline}><b>Until: </b>{dateStringFormat(deadline)}</p>
            </div>
        </NavLink>
    )
}