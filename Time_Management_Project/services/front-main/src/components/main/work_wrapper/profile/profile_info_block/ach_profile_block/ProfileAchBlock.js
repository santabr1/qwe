import Loader from '../../../../../utils_components/Loader'
import React from 'react'
import SingleAch from './SingleAch'
import * as style from './profile_ach_block.module.css'

export default function ProfileAchBlock({achList, loading}) {
    if(loading)
        return <Loader/>

    return <div className={style.wrapper}>
        {
            achList.map(ach => <SingleAch
                ach={ach}
            />)
        }
    </div>
}