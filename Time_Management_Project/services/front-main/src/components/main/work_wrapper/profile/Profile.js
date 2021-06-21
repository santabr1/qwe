import React from 'react'
import {Redirect} from 'react-router-dom'
import Loader from '../../../utils_components/Loader'
import ProfileChangeForm from './profile_info_block/ProfileChangeForm'
import ProfileInfo from './profile_info_block/ProfileInfo'
import * as style from './profile.module.css'

export default function Profile(props) {

    const {
        existsFlag,
        loading,
        id,
        authId,
        isAdmin,
        changeAvatarAction,
        changing,
        setChanging,
        deleteProfile,
        profileInformation,
        updateDeveloper,
        setLoading,
        deleteDeveloper,
        getProfile,
        positionCodes,
        specialtyCodes,
        onSubmitProfileChange,
        logout
    } = props

    const avatarStyle = {
        background: `no-repeat center url(${profileInformation.avatarURL})`,
        height: '300px',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }

    if(!existsFlag)
        return <Redirect to='/profile/'/>
    if(loading) {
        return <Loader />
    } else
        return (
            <div className={style.profile}>
                <div className={style.avatar_wrapper}>
                    <div style={avatarStyle}>
                        {
                            //Проверка на возможность изменения аватарки
                            id === authId || isAdmin
                                ? <>
                                    <input
                                        id='file'
                                        type="file"
                                        className={style.file_choicer}
                                        onChange={(e) => changeAvatarAction(e)}
                                    />
                                    <label htmlFor="file" className={style.file_choicer_style}>Change photo</label>
                                </>
                                : null
                        }
                    </div>
                    {
                        changing
                            ? null
                            : <div className={style.profile_btns}>
                                {
                                    //Проверка на возможность действий на странице
                                    id === authId || isAdmin
                                        ? <>
                                            <button
                                                type='button'
                                                className='primary-btn'
                                                onClick={() => setChanging(true)}>Change profile
                                            </button>
                                            <button
                                                type='button'
                                                className='primary-btn'
                                                onClick={() => {
                                                    if(id === authId)
                                                        logout()
                                                    deleteProfile(id)
                                                }
                                                }>Delete profile
                                            </button>
                                        </>
                                        : null
                                }
                            </div>
                    }
                </div>
                {
                    changing
                        ? <ProfileChangeForm
                            profileInformation={profileInformation}
                            setChanging={setChanging}
                            isAdmin={isAdmin}
                            id={id}
                            updateDeveloper={updateDeveloper}
                            setLoading={setLoading}
                            getProfile={getProfile}
                            positionCodes={positionCodes}
                            specialtyCodes={specialtyCodes}
                            onSubmitProfileChange={onSubmitProfileChange}
                        />
                        : <ProfileInfo
                            profileInformation={profileInformation}
                            setChanging={setChanging}
                            id={id}
                            deleteDeveloper={() => deleteDeveloper(id)}
                        />
                }
            </div>
        )
}