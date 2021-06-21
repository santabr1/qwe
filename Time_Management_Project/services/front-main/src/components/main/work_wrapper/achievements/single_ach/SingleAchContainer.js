import React, {useState} from 'react'
import {connect} from 'react-redux'
import SingleAch from './SingleAch'
import * as Yup from 'yup'
import {updateAchOnServ, updateImgOnServ, deleteAchOnServ, getAchFromServerAndSet} from '../../../../../redux/reducers/ach_reducer'

function SingleAchContainer({
                                ach, updateAchOnServ, updateImgOnServ,
                                deleteAchOnServ, getAchFromServerAndSet,
                                getAll
}) {

    const [loading, setLoading] = useState(false)
    const [editable, setEditable] = useState(false)

    const initialFormValues = {
        achievement_title: ach.achievement_title,
        descritpion: ach.descritpion
    }

    const validationSchema = Yup.object({
        achievement_title: Yup.string().required('Fill out the required field'),
        descritpion: Yup.string().required('Fill out the required field')
    })

    function changeImg(event) {
        setLoading(true)
        updateImgOnServ(ach.achievement_id, event.target.files[0])
            .then(() => getAll())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function onEdit(values) {
        setLoading(true)
        updateAchOnServ(
            ach.achievement_id,
            values.achievement_title,
            values.descritpion
        )
            .then(() => getAll())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function onDelete() {
        setLoading(true)
        deleteAchOnServ(ach.achievement_id)
            .then(() => getAll())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    return <SingleAch
        ach={ach}
        editable={editable}
        setEditable={setEditable}
        loading={loading}
        initialFormValues={initialFormValues}
        validationSchema={validationSchema}
        onEdit={onEdit}
        onDelete={onDelete}
        changeImg={changeImg}
    />
}

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps, {
    updateAchOnServ,
    updateImgOnServ,
    deleteAchOnServ,
    getAchFromServerAndSet
})(SingleAchContainer)