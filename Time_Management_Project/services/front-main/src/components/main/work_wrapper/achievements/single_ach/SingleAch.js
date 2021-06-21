import React from 'react'
import * as style from '../achievements.module.css'
import Loader from '../../../../utils_components/Loader'
import AchForm from '../ach_form/AchForm'

export default function SingleAch({
                                      ach, validationSchema, editable,
                                      setEditable, initialFormValues, onEdit,
                                      loading, onDelete, changeImg
}) {

    if(loading)
        return <div className={style.single_ach_wrapper}>
            <Loader />
        </div>

    if(editable)
        return <AchForm
            validationSchema={validationSchema}
            initialFormValues={initialFormValues}
            onEdit={onEdit}
            setEditable={setEditable}
        />

    let imgLnk = '/ach_img/trophy_icon_by_papillonstudio_d9dtwte_w394_h394.png'
    if(ach.linkIMG && ach.linkIMG.trim().length > 0 && ach.linkIMG.toLowerCase().trim() !== 'null') {
        imgLnk = ach.linkIMG
    }

    const avatarStyle = {
        background: `no-repeat center url(${imgLnk})`,
        height: '250px',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }

    return <div className={style.single_ach_wrapper}>
        <div style={avatarStyle}>
            {/*<input*/}
            {/*    id='file'*/}
            {/*    type="file"*/}
            {/*    className={style.file_choicer}*/}
            {/*    onChange={(e) => changeImg(e)}*/}
            {/*/>*/}
            {/*<label htmlFor="file" className={style.file_choicer_style}>Change photo</label>*/}
        </div>
        <div className={style.ach_info}>
            <h2 className={style.ach_title}>
                {ach.achievement_title}
            </h2>
            <p className={style.ach_desc}>
                {ach.descritpion}
            </p>
        </div>
        <div className={style.ach_action_block}>
            <button
                className={'primary-btn'}
                onClick={() => setEditable(true)}
            >Edit</button>
            <button
                className={'primary-btn'}
                onClick={onDelete}
            >Delete</button>
        </div>
    </div>
}