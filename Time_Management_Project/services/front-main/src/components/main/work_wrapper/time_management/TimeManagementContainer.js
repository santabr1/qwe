import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TimeManagement from './TimeManagement'
import {getWorkingTimeFromServByDeveloperIdAndDate, setWorkingTimeList, getWtFromServFromCalendar} from '../../../../redux/reducers/working_time_requcer'
import {getSubordinatesFromServ} from '../../../../redux/reducers/developers_reducer'
import {authIdSelector, isAdminSelector} from '../../../../redux/selectors'
import {clearCalendarStyles, fillCalendarStyles} from "../../../utils/fillCalendar";


function TimeManagementContainer({
                                     getWorkingTimeFromServByDeveloperIdAndDate, authId, setWorkingTimeList,
                                     isAdmin, getSubordinatesFromServ, getWtFromServFromCalendar
}) {

    const [actualDate, setActualDate] = useState(new Date())
    const [wtDeveloperId, setWtDeveloperId] = useState(authId)
    const [wtIsAdmin, setWtIsAdmin] = useState(isAdmin)
    const [subordinates, setSubordinates] = useState([])
    const [calendarWt, setCalendarWt] = useState([])
    const [isFormShown, setFromShown] = useState(false)

    function isSameDeveloper() {
        return +wtDeveloperId === +authId
    }

    useEffect(() => {
        getWtFromServFromCalendar(wtDeveloperId, actualDate.getMonth() + 1, actualDate.getFullYear())
            .then(res => {
                setCalendarWt(res)
                return res
            })
            .then(res => fillCalendarStyles(res))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [actualDate])

    useEffect(() => {
        getWtFromServFromCalendar(wtDeveloperId, actualDate.getMonth() + 1, actualDate.getFullYear())
            .then(res => {
                setCalendarWt(res)
                return res
            })
            .then(res => fillCalendarStyles(res))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
        onClickOnDate(actualDate)
            .then(() => getSubordinatesFromServ(authId, isAdmin))
            .then(response => setSubordinates(response))
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }, [])

    function onClickOnDate(date, event, developerId) {
        let dev = developerId ? developerId : wtDeveloperId
        setFromShown(false)
        getWtFromServFromCalendar(dev, actualDate.getMonth() + 1, actualDate.getFullYear())
            .then(res => {
                setCalendarWt(res)
                return res
            })
            .then(res => fillCalendarStyles(res))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })

        return getWorkingTimeFromServByDeveloperIdAndDate(dev, date)
            .then(response => setWorkingTimeList(response))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    function onClickOnDeveloper(e) {
        setWtDeveloperId(e.target.value)
        setWtIsAdmin(e.target.selectedOptions[0].dataset.admin === '1')
        clearCalendarStyles()
        onClickOnDate(actualDate, e, e.target.value)
    }

    return <TimeManagement
        actualDate={actualDate}
        setActualDate={setActualDate}
        onClickOnDate={onClickOnDate}
        wtDeveloperId={wtDeveloperId}
        isSameDeveloper={isSameDeveloper}
        subordinates={subordinates}
        setWtDeveloperId={setWtDeveloperId}
        wtIsAdmin={wtIsAdmin}
        setWtIsAdmin={setWtIsAdmin}
        onClickOnDeveloper={onClickOnDeveloper}
        isFormShown={isFormShown}
        setFromShown={setFromShown}
    />
}

function mapStateToProps(state) {
    return {
        authId: authIdSelector(state),
        isAdmin: isAdminSelector(state)
    }
}


export default connect(mapStateToProps, {
    getWorkingTimeFromServByDeveloperIdAndDate,
    setWorkingTimeList,
    getSubordinatesFromServ,
    getWtFromServFromCalendar
})(TimeManagementContainer)