import React, {useState} from 'react'
import * as style from '../notifications.module.css'
import {dateTimeStringFormat} from '../../../../utils/formats'

export default function SingleNotification(props) {
    const {
        sender,
        content,
        date,
        deleteNotificationAction,
        updateNotification,
        accessRights
    } = props

    const [isChanging, setIsChanging] = useState(false)
    const [contentValue, setContentValue] = useState(content)
    const [areaError, setAreaError] = useState(null)

    function onDeleteAction() {

        // eslint-disable-next-line no-restricted-globals
        if(confirm('Are you sure to delete this notification?')) {
            deleteNotificationAction()
                .then(() => setIsChanging(false))
        }
    }

    function updateAction() {
        if(contentValue !== content) {
            updateNotification(contentValue)
                .then(() => setIsChanging(false))
        } else
            setIsChanging(false)
    }

    return <div className={style.notification_wrapper}>
        <div className={style.notification_header}>
            <p className={style.notification_sender}>
                From: <span>{sender}</span>
            </p>
            {
                accessRights
                    ? <button onClick={onDeleteAction}>X</button>
                    : null
            }
        </div>
        {
            isChanging
                ? <>
                    <textarea
                        autoFocus={true}
                        onBlur={() => areaError ? null : updateAction()}
                        value={contentValue}
                        onChange={(event) => {
                            if(event.target.value.length > 3100)
                                setAreaError('Content length is max 3100 symbols')
                            else if(event.target.value.length === 0)
                                setAreaError('Cause is required')
                            else
                                setAreaError(null)
                            setContentValue(event.target.value)
                        }
                        }
                    />
                    {
                        areaError
                            ? <div className={`validation_error ${style.error}`}>{areaError}</div>
                            : null
                    }
                </>
                : <p
                    className={style.notification_content}
                    onDoubleClick={accessRights ? () => setIsChanging(true) : null}>
                    {content}
                </p>
        }
        <p className={style.notification_date}>
            {dateTimeStringFormat(date)}
        </p>
    </div>
}