import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import CalendarActions from './CalendarActions'
import {workingTimeListSelector} from "../../../../../redux/selectors";


function CalendarActionsContainer({wtlist, actualDate, wtDeveloperId, isSameDeveloper, wtIsAdmin, isFormShown, setFromShown}) {



    useEffect(() => {
        setFromShown(false)
    }, [wtDeveloperId])

    return <CalendarActions
        wtlist={wtlist}
        actualDate={actualDate}
        wtDeveloperId={wtDeveloperId}
        isFormShown={isFormShown}
        setFromShown={setFromShown}
        isSameDeveloper={isSameDeveloper}
        wtIsAdmin={wtIsAdmin}
    />
}

function mapStateToProps(state) {
    return {
        wtlist: workingTimeListSelector(state)
    }
}
export default connect(mapStateToProps, {

})(CalendarActionsContainer)