import React from 'react'
import * as style from './loader.module.css'

export default function Loader() {
    return <div className={style.loader_wrapper}>
            <div className={style.lds_dual_ring} />
        </div>
}