import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import * as style from '../profile.module.css'

export default function ProfileChangeForm(props) {

    const {
        profileInformation,
        setChanging,
        isAdmin,
        positionCodes,
        specialtyCodes,
        onSubmitProfileChange
    } = props

    //Здесь и далее 2 варианта изменений - поверхностный и глубокий. Первый - для администраторов,
    // второй - для обычных пользователей
    const initialFormValues = isAdmin
        ? {
            name: profileInformation.name,
            surname: profileInformation.surname,
            patronymic: profileInformation.patronymic,
            birth: profileInformation.birth.slice(0, profileInformation.birth.indexOf('T')),
            email: profileInformation.email,
            position: positionCodes.indexOf(profileInformation.position),
            specialty: specialtyCodes.indexOf(profileInformation.specialty),
            isAdmin: !!profileInformation.isAdmin
        }
        : {
            name: profileInformation.name,
            surname: profileInformation.surname,
            patronymic: profileInformation.patronymic,
            birth: profileInformation.birth.slice(0, profileInformation.birth.indexOf('T')),
            email: profileInformation.email
        }
    const validationFormSchema = isAdmin
        ? Yup.object({
            name: Yup.string().required('Fill out the required field'),
            surname: Yup.string().required('Fill out the required field'),
            birth: Yup.date('Invalid date').max(new Date(), 'Invalid birth date').required('Fill out the required field'),
            email: Yup.string().email('Invalid email').required('Fill out the required field')
        })
        : Yup.object({
            name: Yup.string().required('Fill out the required field'),
            surname: Yup.string().required('Fill out the required field'),
            birth: Yup.date('Invalid date').required('Fill out the required field'),
            email: Yup.string().email('Fill out the required field')
        })

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationFormSchema,
        onSubmit(values) {
            onSubmitProfileChange(values)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={style.profile_change_form}>
            <input
                type='text'
                id='name'
                autoComplete='off'
                {...formik.getFieldProps('name')}
            />
            {formik.errors.name ? <div className='validation_error'>{formik.errors.name}</div> : null}
            <input
                type='text'
                id='surname'
                autoComplete='off'
                {...formik.getFieldProps('surname')}
            />
            {formik.errors.surname ? <div className='validation_error'>{formik.errors.surname}</div> : null}
            <input
                type='text'
                id='patronymic'
                autoComplete='off'
                {...formik.getFieldProps('patronymic')}
            />
            <input
                type='date'
                id='birth'
                {...formik.getFieldProps('birth')}
            />
            {formik.errors.birth ? <div className='validation_error'>{formik.errors.birth}</div> : null}
            <input
                type='email'
                id='email'
                autoComplete='off'
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email ? <div className='validation_error'>{formik.errors.email}</div> : null}
            {
                isAdmin
                    ? <>
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
                                id='isAdmin'
                                {...formik.getFieldProps('isAdmin')}
                                checked={formik.getFieldProps('isAdmin').value}
                            />
                        </div>
                    </>
                    : null
            }
            <div className={style.change_actions}>
                <button type='submit' className='primary-btn'>Save</button>
                <button type='button' onClick={() => setChanging(false)} className={style.back_btn}>Back</button>
            </div>
        </form>
    )
}
