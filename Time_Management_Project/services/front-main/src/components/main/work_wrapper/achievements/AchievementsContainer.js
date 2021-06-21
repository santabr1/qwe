import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Achievements from './Achievements'
import {getAchFromServerAndSet, addAchOnServ} from '../../../../redux/reducers/ach_reducer'
import {achListSelector} from '../../../../redux/selectors'
import * as Yup from 'yup'



function AchievementsContainer({getAchFromServerAndSet, achList, addAchOnServ}) {

    const [loading, setLoading] = useState(false)
    const [isAddFormOpen, setAddFormOpen] = useState(false)

    async function getAll() {
        setLoading(true)
        return getAchFromServerAndSet()
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        getAll()
    }, [])

    const initialAddFormValues = {
        achievement_title: '',
        descritpion: ''
    }

    const validationSchema = Yup.object({
        achievement_title: Yup.string().required('Fill out the required field'),
        descritpion: Yup.string().required('Fill out the required field')
    })

    function onAddAch(values) {
        setLoading(true)
        addAchOnServ(
            values.achievement_title,
            values.descritpion
        )
            .then(() => getAll())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => {
                setLoading(false)
                setAddFormOpen(false)
            })
    }


    return <Achievements
        loading={loading}
        achList={achList}
        isAddFormOpen={isAddFormOpen}
        setAddFormOpen={setAddFormOpen}
        initialAddFormValues={initialAddFormValues}
        onAddAch={onAddAch}
        validationSchema={validationSchema}
        getAll={getAll}
    />
}

function mapStateToProps(state) {
    return {
        achList: achListSelector(state)
    }
}


export default connect(mapStateToProps, {
    getAchFromServerAndSet,
    addAchOnServ
})(AchievementsContainer)