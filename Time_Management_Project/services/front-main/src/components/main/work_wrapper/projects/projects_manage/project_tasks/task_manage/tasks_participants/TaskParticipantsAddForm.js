import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as style from './task_participants_add_form.css'

export default function TaskParticipantsAddForm({onSubmitAddDeveloper}) {

    const formik = useFormik({
        initialValues: {
            developerEmail: ''
        },
        validationSchema: Yup.object({
            developerEmail: Yup.string().required('Fill out required field')
        }),
        onSubmit(values) {
            onSubmitAddDeveloper(values)
        }
    })

    return <form
        style={{display: 'flex'}}
        onSubmit={formik.handleSubmit}
    >
        <input
            type='email'
            id='developerEmail'
            {...formik.getFieldProps('developerEmail')}
            placeholder='Add by email'
            autoComplete='off'
            style={{margin: '0'}}
        />
        <button type='submit' className='primary-btn' style={{
            width: '200px',
            margin: '0 20px 0 20px'
        }}>Add&nbsp;developer</button>
    </form>
}

