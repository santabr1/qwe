import React, {useState} from 'react'
import ChangingDateItem from './ChangingDateItem'

export default function ChangingDateItemContainer(props) {
    const {
        itemId,
        deleteChangingDateItem,
        deadlineBefore,
        deadlineAfter,
        cause,
        updateChangingDate,
        getChangingDates,
        accessRights
    } = props

    const [updatingCause, setUpdatingCause] = useState(false)
    const [changeValue, setChangeValue] = useState(cause)

    function updateCause() {
        updateChangingDate(itemId, changeValue)
            .then(() => getChangingDates())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setUpdatingCause(false))
    }

    return <ChangingDateItem
        itemId={itemId}
        deleteChangingDateItem={deleteChangingDateItem}
        deadlineBefore={deadlineBefore}
        deadlineAfter={deadlineAfter}
        cause={cause}
        updatingCause={updatingCause}
        setUpdatingCause={setUpdatingCause}
        changeValue={changeValue}
        setChangeValue={setChangeValue}
        updateCause={updateCause}
        accessRights={accessRights}
    />
}