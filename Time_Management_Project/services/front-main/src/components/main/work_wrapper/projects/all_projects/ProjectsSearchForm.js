import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

export default function ProjectsSearchForm({onSubmitSearchProject}) {
    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: Yup.object({
            title: Yup.string('Must be string')
        }),
        onSubmit(values) {
            onSubmitSearchProject(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className='search_form'>
            <p className='search_annotation'>Search&nbsp;by </p>
            <input
                type='text'
                placeholder='project title'
                id='title'
                autoComplete='off'
                {...formik.getFieldProps('title')}
            />
            <input type="submit" className='primary-btn' value='Search'/>
        </form>
    )
}