import React from 'react'
import * as style from './profile_ach_block.module.css'

export default function SingleAch({ach}) {
    return <div className={style.single_ach_wrapper}>
        <img
            src={ach.linkImg || '/ach_img/trophy_icon_by_papillonstudio_d9dtwte_w394_h394.png'}
            className={style.ach_img}
            alt={''}
        />
        <div className={style.ach_info}>
            <h2 className={style.ach_title}>
                {ach.achievement_title}
            </h2>
            <p className={style.ach_desc}>
                {ach.descritpion}
            </p>
        </div>
    </div>
}