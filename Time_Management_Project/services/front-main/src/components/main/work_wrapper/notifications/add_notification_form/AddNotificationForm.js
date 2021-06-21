import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as style from '../notifications.module.css'


export default function AddNotificationForm({onSubmitPutNotification}) {

    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema: Yup.object({
            content: Yup.string().max(3100, 'Content must be max 3100 symbols length').required('Fill out the required field')
        }),
        onSubmit(values) {
            onSubmitPutNotification(values)
        }
    })

    return <form onSubmit={formik.handleSubmit} className={style.add_form}>
        <textarea
            id='content'
            placeholder='Write text of notification'
            autoComplete='off'
            {...formik.getFieldProps('content')}
        />
        {
            formik.errors.content && formik.touched.content
                ? <p className='validation_error'>{formik.errors.content}</p>
                : null
        }
        <button className='primary-btn'>
            Add notification
        </button>
    </form>
}