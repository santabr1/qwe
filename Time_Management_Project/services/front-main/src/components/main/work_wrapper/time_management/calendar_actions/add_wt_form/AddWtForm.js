import React from 'react'
import {useFormik} from "formik";
import * as style from "../../../work_with_project_form/work_with_project_form.module.css";


export default function AddWtForm({initialValues, validationSchema, onSubmit, tasks}) {
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })

    return  <form onSubmit={formik.handleSubmit} className={style.work_with_project_form}>
        <input
            type='time'
            placeholder=''
            id='startTime'
            name={'startTime'}
            autoComplete='off'
            {...formik.getFieldProps('startTime')}
        />
        {
            formik.errors.startTime && formik.touched.startTime
                ? <p className='validation_error'>{formik.errors.startTime}</p>
                : null
        }
        <input
            type='time'
            placeholder=''
            id='endTime'
            autoComplete='off'
            {...formik.getFieldProps('endTime')}
        />
        {
            formik.errors.endTime && formik.touched.endTime
                ? <p className='validation_error'>{formik.errors.endTime}</p>
                : null
        }
        <textarea
            name='wtDescription'
            id='wtDescription'
            autoComplete='off'
            {...formik.getFieldProps('wtDescription')}
            placeholder='Achievement description'
        />
        {
            formik.errors.wtDescription && formik.touched.wtDescription
                ? <p className='validation_error'>{formik.errors.wtDescription}</p>
                : null
        }
        <select
            name="tasks"
            style={{ display: 'block' }}
            value={formik.values.tasks}
            onChange={formik.handleChange}
            placeholder={'Enter task'}
        >
            <option value="" selected disabled>Please select an task...</option>
            {
                tasks.map(t => <option value={t.task_id} label={t.task_title} key={t.task_id}/>)
            }
        </select>
        <button type={"submit"} className={'primary-btn'}>
            Save
        </button>
    </form>
}