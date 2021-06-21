import React, {useState} from 'react'
import {useFormik} from 'formik'
import {NavLink} from 'react-router-dom'
import * as Yup from 'yup'
import Loader from '../../../utils_components/Loader'
import * as style from './work_with_project_form.module.css'

export default function WorkWithProjectForm(props) {
    const {
        initialValues,
        onSubmit,
        actualProject,
        action,
        location,
        projectId
    } = props


    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: initialValues(actualProject),
        validationSchema: Yup.object({
            title: Yup.string().required('Fill out the required field'),
            description: Yup.string().max(2000, 'Description max length is 2000'),
            deadline: Yup.date().min(new Date(), 'Invalid deadline date').required('Fill out the required field'),
            projectLeadEmail: Yup.string().email('Invalid email')
        }),
        onSubmit(values) {
            onSubmit(values, setLoading)
        }
    })

    if (loading)
        return <Loader/>

    return (
        <form onSubmit={formik.handleSubmit} className={style.work_with_project_form}>
            <input
                type='text'
                placeholder='Title'
                id='text'
                autoComplete='off'
                {...formik.getFieldProps('title')}
            />
            {
                formik.errors.title && formik.touched.title
                    ? <p className='validation_error'>{formik.errors.title}</p>
                    : null
            }
            <textarea
                name='description'
                id='description'
                autoComplete='off'
                {...formik.getFieldProps('description')}
                placeholder='Description of project'
            />
            {
                formik.errors.description && formik.touched.description
                    ? <p className='validation_error'>{formik.errors.description}</p>
                    : null
            }
            <input
                type='date'
                id='deadline'
                autoComplete='off'
                {...formik.getFieldProps('deadline')}
            />
            {
                formik.errors.deadline && formik.touched.deadline
                    ? <p className='validation_error'>{formik.errors.deadline}</p>
                    : null
            }
            <input
                type='email'
                id='projectLeadEmail'
                autoComplete='off'
                {...formik.getFieldProps('projectLeadEmail')}
                placeholder='Project lead`s email'
            />
            {
                formik.errors.projectLeadEmail && formik.touched.projectLeadEmail
                    ? <p className='validation_error'>{formik.errors.projectLeadEmail}</p>
                    : null
            }
            <div>
                <button
                    className='primary-btn'
                    type='submit'
                >{action} project
                </button>
                <NavLink
                    className='back_action'
                    to={location.pathname.includes('put-project')
                        ? '/projects/1'
                        : `/single_project/${projectId}/project_info`
                    }
                >Back</NavLink>
            </div>
        </form>
    )
}
