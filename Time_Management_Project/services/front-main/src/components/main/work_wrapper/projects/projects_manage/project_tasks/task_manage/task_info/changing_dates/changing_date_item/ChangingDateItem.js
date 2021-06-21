import React, {useState} from 'react'
import * as style from './changing_date.module.css'
import {dateTimeStringFormat} from '../../../../../../../../../utils/formats'

export default function ChangingDateItem(props) {
    const {
        itemId,
        deleteChangingDateItem,
        deadlineBefore,
        deadlineAfter,
        cause,
        setUpdatingCause,
        updatingCause,
        changeValue,
        setChangeValue,
        updateCause,
        accessRights
    } = props

    const [error, setError] = useState(null)

    return <div className={style.changing_date_item}>
        {
            accessRights
                ? <button onClick={() => deleteChangingDateItem(itemId)}>X</button>
                : null
        }
        <h3 className={style.changing_date_item_deadlines}>
            {dateTimeStringFormat(deadlineBefore)}
            <span>></span>
            {dateTimeStringFormat(deadlineAfter)}
        </h3>
        {
            updatingCause && accessRights
                ? <>
                    <textarea
                        autoFocus={true}
                        onBlur={(e) => {
                            return error
                                ? null
                                : (changeValue === cause
                                        ? setUpdatingCause(false)
                                        : updateCause()
                                )}
                        }
                        value={changeValue}
                        onChange={(event) => {
                            if(event.target.value.length > 500)
                                setError('Content length is max 500 symbols')
                            else if(event.target.value.length === 0)
                                setError('Cause is required')
                            else
                                setError(null)
                            setChangeValue(event.target.value)
                        }
                        }
                    />
                    {
                        error
                            ? <div className='validation_error'>{error}</div>
                            : null
                    }

                </>
                : <p
                    className={style.changing_date_item_causes}
                    onDoubleClick={
                        accessRights ?
                            () => setUpdatingCause(true)
                            : null
                    }>
                    {cause}
                </p>
        }

    </div>
}