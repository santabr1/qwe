import {useFormik} from 'formik'
import {NavLink} from 'react-router-dom'
import * as Yup from 'yup'
import React from 'react'
import {withRouter} from 'react-router-dom'
import * as style from './put_developer_form.module.css'

function PutDeveloperForm({onSubmitPutDeveloper}) {
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            patronymic: '',
            birth: '',
            email: '',
            position: '0',
            specialty: '0',
            isAdmin: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Fill out the required field'),
            surname: Yup.string().required('Fill out the required field'),
            birth: Yup.date('Invalid date').max(new Date(), 'Invalid birth date').required('Fill out the required field'),
            email: Yup.string().email('Invalid email').required('Fill out the required field'),
            password: Yup.string().required('Fill out the required field')
        }),
        onSubmit(values) {
            onSubmitPutDeveloper(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={style.developer_put_form}>
            <div className={style.developer_put_form_data}>
                <input
                    type='text'
                    id='name'
                    autoComplete='off'
                    {...formik.getFieldProps('name')}
                    placeholder='*name'
                />
                {
                    formik.errors.name && formik.touched.name
                        ? <div className='validation_error'>{formik.errors.name}</div>
                        : null
                }
                <input
                    type='text'
                    id='surname'
                    autoComplete='off'
                    {...formik.getFieldProps('surname')}
                    placeholder='*surname'
                />
                {
                    formik.errors.surname && formik.touched.surname
                        ? <div className='validation_error'>{formik.errors.surname}</div>
                        : null
                }
                <input
                    type='text'
                    id='patronymic'
                    autoComplete='off'
                    {...formik.getFieldProps('patronymic')}
                    placeholder='patronymic'
                />
                {
                    formik.errors.patronymic && formik.touched.patronymic
                        ? <div className='validation_error'>{formik.errors.patronymic}</div>
                        : null
                }
                <input
                    type='date'
                    id='birth'
                    autoComplete='off'
                    {...formik.getFieldProps('birth')}
                    placeholder='*birth'
                />
                {
                    formik.errors.birth && formik.touched.birth
                        ? <div className='validation_error'>{formik.errors.birth}</div>
                        : null
                }
                <input
                    type='email'
                    id='email'
                    autoComplete='off'
                    {...formik.getFieldProps('email')}
                    placeholder='*email'
                />
                {
                    formik.errors.email && formik.touched.email
                        ? <div className='validation_error'>{formik.errors.email}</div>
                        : null
                }
                <select
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ display: 'block' }}
                >
                    <option value='0' label='Developer'/>
                    <option value='1' label='QA Developer'/>
                    <option value='2' label='Frontend Developer'/>
                    <option value='3' label='Backend Developer'/>
                    <option value='4' label='Fullstack Developer'/>
                    <option value='5' label='Data scientist'/>
                    <option value='6' label='iOS developer'/>
                    <option value='7' label='Android developer'/>
                    <option value='8' label='System administrator'/>
                </select>

                <select
                    name="specialty"
                    value={formik.values.specialty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ display: 'block' }}
                >
                    <option value='0' label='Trainee'/>
                    <option value='1' label='Junior'/>
                    <option value='2' label='Middle'/>
                    <option value='3' label='Senior'/>
                    <option value='4' label='Technical Director'/>
                </select>

                <div>
                    <span>Is admin: </span>
                    <input
                        type='checkbox'
                        id='IsAdmin'
                        {...formik.getFieldProps('isAdmin')}
                        checked={formik.getFieldProps('isAdmin').value}
                    />
                </div>
                {
                    formik.errors.avatarURL && formik.touched.avatarURL
                        ? <div className='validation_error'>{formik.errors.avatarURL}</div>
                        : null
                }
                <input type="password"
                       id='password'
                       autoComplete='off'
                       {...formik.getFieldProps('password')}
                       placeholder='password'
                />
                {
                    formik.errors.password && formik.touched.password
                        ? <div className='validation_error'>{formik.errors.password}</div>
                        : null
                }
                <div className={style.developer_put_form_actions}>
                    <button type='submit' className='primary-btn'>Save</button>
                    <NavLink to='/developers/1' className='back_action'>Back</NavLink>
                </div>
            </div>
        </form>
    )
}

export default withRouter(PutDeveloperForm)