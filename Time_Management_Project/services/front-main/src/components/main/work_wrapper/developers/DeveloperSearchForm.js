import {useFormik} from 'formik'
import React from 'react'
import * as Yup from 'yup'

export default function DeveloperSearchForm({onSubmitSearchDevelopers}) {
    const formik = useFormik({
        initialValues: {
            email: '',
            surname: ''
        },
        validationSchema: Yup.object({
            email: Yup.string(),
            surname: Yup.string()
        }),
        onSubmit(values) {
            onSubmitSearchDevelopers(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className='search_form'>
            <p className='search_annotation'>Search&nbsp;by </p>
            <input
                type='email'
                placeholder='email'
                id='email'
                autoComplete='off'
                {...formik.getFieldProps('email')}
            />
            <p className='search_annotation'>or</p>
            <input
                type='text'
                placeholder='surname'
                id='surname'
                autoComplete='off'
                {...formik.getFieldProps('surname')}
            />
            <input type="submit" className='primary-btn' value='Search'/>
        </form>
    )
}