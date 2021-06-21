import React from 'react'
import * as style from './changing_dates.module.css'
import ChangingDateItemContainer from './changing_date_item/ChangingDateItemContainer'

export default function ChangingDates(props) {
    const {
        changingDatesList,
        changing,
        setChanging,
        formik,
        deleteChangingDateItem,
        updateChangingDate,
        getChangingDates,
        accessRights
    } = props
    return (
        <>
            <h2 className={style.change_history}>Changing deadlines history</h2>
            {
                accessRights
                    ? <button
                        className='primary-btn'
                        onClick={() => setChanging(!changing)}
                    >{changing ? 'Back' : 'Change deadline'}</button>
                    : null
            }
            {
                changingDatesList.length > 0
                    ? changingDatesList.map(cd => <ChangingDateItemContainer
                        itemId={cd.changing_date_id}
                        deleteChangingDateItem={deleteChangingDateItem}
                        deadlineBefore={cd.changing_date_deadline_before}
                        deadlineAfter={cd.changing_date_deadline_after}
                        cause={cd.changing_date_cause}
                        updateChangingDate={updateChangingDate}
                        getChangingDates={getChangingDates}
                        accessRights={accessRights}
                    />)
                    : <p className={style.no_results_message}>
                        No changes yet
                    </p>
            }
            {
                changing && accessRights
                    ? <form onSubmit={formik.handleSubmit} className={style.form}>
                        <div className={style.form_date_wrapper}>
                            <input
                                type="date"
                                id='changedDate'
                                {...formik.getFieldProps('changedDate')}
                            />
                            {
                                formik.errors.changedDate && formik.touched.changedDate
                                    ? <p className='validation_error'>{formik.errors.changedDate}</p>
                                    : null
                            }
                            <input
                                type="time"
                                id='changedTime'
                                {...formik.getFieldProps('changedTime')}
                            />
                            {
                                formik.errors.changedTime && formik.touched.changedTime
                                    ? <p className='validation_error'>{formik.errors.changedTime}</p>
                                    : null
                            }
                        </div>
                        <textarea
                            id='cause'
                            autoComplete='off'
                            {...formik.getFieldProps('cause')}
                            placeholder='Cause of changing actual deadline'
                        />
                        {
                            formik.errors.cause && formik.touched.cause
                                ? <p className='validation_error'>{formik.errors.cause}</p>
                                : null
                        }
                        <button type='submit' className='primary-btn'>Change deadline</button>
                    </form>
                    : null
            }
        </>
    )
}