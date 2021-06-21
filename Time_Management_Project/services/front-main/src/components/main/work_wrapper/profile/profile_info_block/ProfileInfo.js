import React from 'react'
import {dateStringFormat} from '../../../../utils/formats'
import * as style from '../profile.module.css'
import ProfileAchBlockContainer from "./ach_profile_block/ProfileAchBlockContainer";

export default function ProfileInfo({profileInformation, id}) {
    return (
        <div className={style.text_info}>
            <p className={style.full_name}>
                <b>{profileInformation.name} {profileInformation.surname} {profileInformation.patronymic}</b>
            </p>
            <p className={style.specialty}>
                {profileInformation.position} {profileInformation.specialty}
            </p>
            <p>

                Date of birth: <b>{
                profileInformation.birth
                    ? dateStringFormat(profileInformation.birth)
                    : null
            }</b>
            </p>
            <p>
                Email: <b>{profileInformation.email}</b>
            </p>

            <ProfileAchBlockContainer
                id={id}
            />
        </div>
    )
}