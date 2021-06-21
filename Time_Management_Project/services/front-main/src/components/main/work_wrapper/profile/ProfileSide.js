import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Profile from './Profile'
import {developersAPI} from '../../../../api'

function ProfileSide(props) {

    const {
        profileInformation,
        authId,
        getProfile,
        isAdmin,
        updateDeveloper,
        deleteDeveloper,
        history,
        match,
        changeAvatar,
        positionCodes,
        specialtyCodes,
        logout
    } = props

    let id = match.params.id ? match.params.id : authId

    let [changing, setChanging] = useState(false)
    let [loading, setLoading] = useState(false)

    //Флаг для проверки существования показываемого профиля. Если false =>
    //происходит редирект
    let [existsFlag, setExistsFlag] = useState(true)

    function changeAvatarAction(event) {
        setLoading(true)
        changeAvatar(id, event.target.files[0])
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function deleteProfile(developerId) {
        // eslint-disable-next-line no-restricted-globals
        const choice = confirm('Are you sure to delete this profile?')
        if(choice) {
            deleteDeveloper(developerId)
                .then(() => history.push('/developers/1'))
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                })
        }
    }
    function onSubmitProfileChange(values) {
        let choice = true

        //Защита от случайного изменения прав по схеме
        //администратор -> обычный разработчик
        if((profileInformation.isAdmin !== values.isAdmin) && profileInformation.isAdmin) {
            // eslint-disable-next-line no-restricted-globals
            choice = confirm('Are you sure you want to stop being an administrator? Only another administrator can restore the authority')
        }
        if(choice) {
            setLoading(true)
            developersAPI.checkEmail(values.email, id)
                .then(async (response) => {
                    if(response.passed) {
                        await updateDeveloper(id, values)
                        await getProfile(id)
                        setChanging(false)
                    } else {
                        alert('This mail belongs to another user')
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        setLoading(true)
        getProfile(id)
            .catch((err) => {

                //Если пользователь не найден => редирект
                setExistsFlag(false)
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

        //Установка просмотра профиля при переходе с профиля на профиль
        setChanging(false)

    }, [id])

    return <Profile
        existsFlag={existsFlag}
        loading={loading}
        id={id}
        authId={authId}
        isAdmin={isAdmin}
        changeAvatarAction={changeAvatarAction}
        changing={changing}
        setChanging={setChanging}
        deleteProfile={deleteProfile}
        profileInformation={profileInformation}
        updateDeveloper={updateDeveloper}
        setLoading={setLoading}
        deleteDeveloper={deleteDeveloper}
        getProfile={getProfile}
        positionCodes={positionCodes}
        specialtyCodes={specialtyCodes}
        onSubmitProfileChange={onSubmitProfileChange}
        logout={logout}
    />
}

export default withRouter(ProfileSide)