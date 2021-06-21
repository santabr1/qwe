import React from 'react'
import {connect} from 'react-redux'
import SingleTime from './SingleTime'
import {
    deleteWtOnServ,
    setWorkingTimeList,
    getWorkingTimeFromServByDeveloperIdAndDate,
    updateStatusOnServ
} from '../../../../../../redux/reducers/working_time_requcer'

function SingleTimeContainer({
                                 wt, deleteWtOnServ, developerId, date,
                                 setWorkingTimeList, getWorkingTimeFromServByDeveloperIdAndDate,
                                 updateStatusOnServ, isSameDeveloper
}) {

    function onDelete() {
        deleteWtOnServ(wt.id)
            .then(() => getWorkingTimeFromServByDeveloperIdAndDate(developerId, date))
            .then(response => setWorkingTimeList(response))
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }

    function onUpdateStatus(statusId) {
        updateStatusOnServ(wt.id, statusId)
            .then(() => getWorkingTimeFromServByDeveloperIdAndDate(developerId, date))
            .then(response => setWorkingTimeList(response))
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }

    return <SingleTime
        comment={wt.comment}
        endTime={wt.endTime}
        startTime={wt.startTime}
        taskTitle={wt.taskTitle}
        status={wt.status}
        onDelete={onDelete}
        onUpdateStatus={onUpdateStatus}
        isSameDeveloper={isSameDeveloper}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {
    deleteWtOnServ,
    setWorkingTimeList,
    getWorkingTimeFromServByDeveloperIdAndDate,
    updateStatusOnServ
})(SingleTimeContainer)