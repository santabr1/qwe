import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import ChangingDates from './ChangingDates'

export default function ChangingDatesContainer(props) {
    const {
        actualTaskId,
        changingDatesList,
        deleteChangingDate,
        putChangingDate,
        updateChangingDate,
        setLoadingParent,
        actualDeadline,
        getChangingDates,
        getSingleTask,
        accessRights
    } = props

    const [changing, setChanging] = useState(false)
    const formik = useFormik({
        initialValues: {
            cause: '',
            changedDate: '',
            changedTime: ''
        },
        validationSchema: Yup.object({
            cause: Yup.string().max(500, 'Cause max length is 500').required('Fill out the required field'),
            changedDate: Yup.date('Invalid date').required('Fill out the required field'),
            changedTime: Yup.string().required('Fill out the required field')
        }),
        onSubmit(values) {
            setLoadingParent(true)
            putChangingDate(
                values.cause,
                (new Date(Date.parse(actualDeadline) + 1000 * 60 * 60 * 3)).toJSON().replace('T', ' ').replace('Z', ''),
                values.changedDate + ' ' + values.changedTime,
                actualTaskId
            )
                .then(() => getSingleTask(actualTaskId))
                .then(() => getChangingDates(actualTaskId))
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoadingParent(false))

        }
    })

    function deleteChangingDateItem(changingItemId) {

        // eslint-disable-next-line no-restricted-globals
        if(confirm('Are you sure to delete this deadline changing?')) {
            setLoadingParent(true)
            deleteChangingDate(changingItemId)
                .then(() => getChangingDates(actualTaskId))
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoadingParent(false))
        }
    }
    return <ChangingDates
        changingDatesList={changingDatesList}
        changing={changing}
        setChanging={setChanging}
        formik={formik}
        deleteChangingDateItem={deleteChangingDateItem}
        updateChangingDate={updateChangingDate}
        getChangingDates={() => getChangingDates(actualTaskId)}
        accessRights={accessRights}
    />
}