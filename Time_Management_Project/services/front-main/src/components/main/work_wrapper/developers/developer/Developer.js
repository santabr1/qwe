import React from 'react'
import {NavLink} from 'react-router-dom'
import * as style from '../developers.module.css'

export default function SingleDeveloper(props) {
    const {
        id,
        name,
        avatarURL,
        surname,
        email,
        specialty,
        position,
        deleteDeveloperAction
    } = props

    return (
        <div className={style.developer_wrapper}>
            <NavLink to={`/profile/${id}`}>
                <div className={style.single_developer}>
                    <img src={avatarURL} alt='avatar'/>
                    <div>
                        <p className={style.single_developer_full_name}>{name} {surname}</p>
                        <p className={style.single_developer_email}>{email}</p>
                        <p>{position} {specialty}</p>
                    </div>
                </div>
            </NavLink>
            {
                deleteDeveloperAction
                    ? <button onClick={() => deleteDeveloperAction(id)} className={style.delete_btn}>X</button>
                    : null
            }

        </div>
    )
}