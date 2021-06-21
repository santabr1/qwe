import React from 'react'
import {useFormik} from 'formik'
import * as style from '../achievements.module.css'

export default function AchForm({initialFormValues, onEdit, validationSchema, setEditable}) {

    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: onEdit,
        validationSchema: validationSchema
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={style.ach_form_wrapper}
        >
            <div>
                <input
                    className={style.ach_form_input}
                    type='text'
                    id='achievement_title'
                    autoComplete='off'
                    {...formik.getFieldProps('achievement_title')}
                    placeholder='*Title'
                />
                {
                    formik.errors.name && formik.touched.name
                        ? <div className='validation_error'>{formik.errors.name}</div>
                        : null
                }
                <textarea
                    className={style.ach_form_input + ' ' + style.ach_form_ta}
                    name='descritpion'
                    id='descritpion'
                    autoComplete='off'
                    {...formik.getFieldProps('descritpion')}
                    placeholder='Achievement description'
                />
                {
                    formik.errors.descritpion && formik.touched.descritpion
                        ? <p className='validation_error'>{formik.errors.descritpion}</p>
                        : null
                }

                <div className={style.ach_form_actions_wrapper}>
                    <button
                        type='submit'
                        className='primary-btn'
                    >Save</button>
                    <button
                        onClick={() => setEditable(false)}
                        className='primary-btn'
                    >Back</button>
                </div>
            </div>
        </form>
    )
}