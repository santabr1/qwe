import React from 'react'
import * as style from './header.module.css'

export default function Header({headerLogo}) {
    return <header>
            <div className={style.header_logo}>
                {headerLogo}
            </div>
        </header>
}