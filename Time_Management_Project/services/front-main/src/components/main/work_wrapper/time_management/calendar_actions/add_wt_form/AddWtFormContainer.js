import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getAllDevelopersTasks} from '../../../../../../redux/reducers/tasks_reducer'
import {getSingleDeveloperById} from '../../../../../../redux/reducers/developers_reducer'
import {
    addWtOnServ,
    getWorkingTimeFromServByDeveloperIdAndDate,
    setWorkingTimeList
} from '../../../../../../redux/reducers/working_time_requcer'
import AddWtForm from "./AddWtForm";
import * as Yup from "yup";
import {dateToDateString} from "../../../../../utils/formats";

function AddWtFormContainer({
                                developerId, getAllDevelopersTasks,
                                getSingleDeveloperById, addWtOnServ,
                                getWorkingTimeFromServByDeveloperIdAndDate,
                                setWorkingTimeList, actualDate, wtIsAdmin
}) {

    const [tasksByDeveloper, setTasksByDeveloper] = useState([])

    function onSubmit(values) {
        const startTime = `${dateToDateString(actualDate)} ${values.startTime}`
        const endTime = `${dateToDateString(actualDate)} ${values.endTime}`

        addWtOnServ(developerId, values.tasks, startTime, endTime, values.wtDescription)
            .then(() => getWorkingTimeFromServByDeveloperIdAndDate(developerId, actualDate))
            .then(response => setWorkingTimeList(response))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    const initialValues = {
        startTime: '',
        endTime: '',
        wtDescription: '',
        tasks: ''
    }

    const validationSchema = Yup.object({
        startTime: Yup.string().required('Fill out the required field'),
        endTime: Yup.string().required('Fill out the required field'),
        wtDescription: Yup.string().required('Fill out the required field'),
        tasks: Yup.string().required('Fill out the required field')
    })


    useEffect(() => {
        getSingleDeveloperById(developerId)
            .then(d => getAllDevelopersTasks(developerId, wtIsAdmin))
            .then(tasks => setTasksByDeveloper(tasks))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [])

    return <AddWtForm
        tasks={tasksByDeveloper}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
    />
}

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps, {
    getAllDevelopersTasks,
    getSingleDeveloperById,
    addWtOnServ,
    getWorkingTimeFromServByDeveloperIdAndDate,
    setWorkingTimeList
})(AddWtFormContainer)