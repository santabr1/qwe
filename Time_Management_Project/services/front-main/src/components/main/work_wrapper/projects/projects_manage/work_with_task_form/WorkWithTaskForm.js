import React, {useState} from 'react'
import {useFormik} from 'formik'
import {NavLink} from 'react-router-dom'
import * as Yup from 'yup'
import Loader from '../../../../../utils_components/Loader'
import * as style from './work_with_task_form.module.css'

export default function WorkWithTaskForm(props) {
    const {
        initialValues,
        onSubmit,
        actualTask,
        action,
        location,
        projectId
    } = props


    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Fill out the required field'),
            description: Yup.string().max(2000, 'Description max length is 2000'),
            results: Yup.string().max(3000, 'Results max length is 3000'),
            planned_deadline_date: location.pathname.includes('change_task') ? null : Yup.date().min(new Date(), 'Invalid deadline date').required('Fill out the required field'),
            planned_deadline_time: location.pathname.includes('change_task') ? null : Yup.string().required('Fill out the required field'),
            taskLeadEmail: Yup.string().email('Invalid email')
        }),
        onSubmit(values) {
            onSubmit(values, setLoading)
        }
    })

    if(loading)
        return <Loader/>

    return (
        <form onSubmit={formik.handleSubmit} className={style.work_with_tasks_form}>
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
                placeholder='Description of task'
            />
            {
                formik.errors.description && formik.touched.description
                    ? <p className='validation_error'>{formik.errors.description}</p>
                    : null
            }

            <textarea
                name='results'
                id='results'
                autoComplete='off'
                {...formik.getFieldProps('results')}
                placeholder='Results of task'
            />
            {
                formik.errors.results && formik.touched.results
                    ? <p className='validation_error'>{formik.errors.results}</p>
                    : null
            }

            {
                location.pathname.includes('change_task')
                    ? null
                    : <>
                        <input
                            type='date'
                            id='planned_deadline_date'
                            autoComplete='off'
                            {...formik.getFieldProps('planned_deadline_date')}
                        />
                        {
                            formik.errors.planned_deadline_date && formik.touched.planned_deadline_date
                                ? <p className='validation_error'>{formik.errors.planned_deadline_date}</p>
                                : null
                        }
                        <input
                            type='time'
                            id='planned_deadline_time'
                            autoComplete='off'
                            {...formik.getFieldProps('planned_deadline_time')}
                        />
                        {
                            formik.errors.planned_deadline_time && formik.touched.planned_deadline_time
                                ? <p className='validation_error'>{formik.errors.planned_deadline_time}</p>
                                : null
                        }
                    </>
            }

            <input
                type='email'
                id='taskLeadEmail'
                autoComplete='off'
                {...formik.getFieldProps('taskLeadEmail')}
                placeholder='Task lead`s email'
            />
            {
                formik.errors.taskLeadEmail && formik.touched.taskLeadEmail
                    ? <p className='validation_error'>{formik.errors.taskLeadEmail}</p>
                    : null
            }
            <div>
                <button
                    className='primary-btn'
                    type='submit'
                >{action} task</button>
                <NavLink
                    className='back_action'
                    to={location.pathname.includes('put_task')
                        ? `/single_project/${projectId}/tasks/all_tasks/`
                        : `/single_project/${projectId}/tasks/single_task/${actualTask.task_id}/task_info`
                    }
                >Back</NavLink>
            </div>
        </form>
    )
}