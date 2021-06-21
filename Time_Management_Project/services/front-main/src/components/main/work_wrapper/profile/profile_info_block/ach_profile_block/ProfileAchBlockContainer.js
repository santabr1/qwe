import {connect} from 'react-redux'
import ProfileAchBlock from './ProfileAchBlock'
import {achListSelector} from '../../../../../../redux/selectors'
import {getAchByDeveloperFromServerAndSet} from '../../../../../../redux/reducers/ach_reducer'
import * as selectors from '../../../../../../redux/selectors'
import React, {useEffect, useState} from 'react'


function ProfileAchBlockContainer({authId, achList, getAchByDeveloperFromServerAndSet, id}) {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAchByDeveloperFromServerAndSet(id)
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }, [])


    return <ProfileAchBlock
        loading={loading}
        achList={achList}
    />
}

function mapStateToProps(state) {
    return {
        achList: achListSelector(state),
        authId: selectors.authIdSelector(state),
    }
}

export default connect(mapStateToProps, {
    getAchByDeveloperFromServerAndSet
})(ProfileAchBlockContainer)