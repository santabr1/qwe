import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as style from './auth_form.module.css'

export default function AuthForm(props) {
    const {onSubmitAuth} = props

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            login: Yup.string().max(50, 'Email must be less then 50 symbols').required('Please, enter email'),
            password: Yup.string().max(150, 'Password must be less then 150 symbols').required('You must enter password')
        }),
        onSubmit: onSubmitAuth
    })

    return <form onSubmit={formik.handleSubmit} className={style.auth_form}>
        <h1>ITime</h1>
        <input
            type="text"
            autoComplete='off'
            placeholder='Enter login'
            id='login'
            {...formik.getFieldProps('login')}
        />
        {
            formik.errors.login && formik.touched.login
                ? <p className='validation_error'>{formik.errors.login}</p>
                : null
        }
        <input
            type="password"
            autoComplete='off'
            placeholder='Enter password'
            id='password'
            {...formik.getFieldProps('password')}
        />
        {
            formik.errors.password && formik.touched.password
                ? <p className='validation_error'>{formik.errors.password}</p>
                : null
        }
        <button
            className='primary-btn'
        >Login</button>
    </form>
}