import React from 'react'
import * as style from './achievements.module.css'
import Loader from '../../../utils_components/Loader'
import SingleAchContainer from './single_ach/SingleAchContainer'
import AchForm from "./ach_form/AchForm";

export default function Achievements({
                                         achList, loading, isAddFormOpen,
                                         setAddFormOpen, initialAddFormValues,
                                         onAddAch, validationSchema, getAll
                                     }) {
    if (loading)
        return <Loader/>

    return <div className={style.page_container}>
        <div className={style.wrapper}>
            {
                achList.map(ach => <SingleAchContainer
                    ach={ach}
                    getAll={getAll}
                    key={ach.achievement_id}
                />)
            }
        </div>
        <button
            className={'primary-btn ' + style.add_ach_btn}
            onClick={() => setAddFormOpen(!isAddFormOpen)}
        >{isAddFormOpen ? 'Close form' : 'Add new achievement'}</button>
        {
            isAddFormOpen && <AchForm
                initialFormValues={initialAddFormValues}
                onEdit={onAddAch}
                setEditable={setAddFormOpen}
                validationSchema={validationSchema}
            />
        }
    </div>
}