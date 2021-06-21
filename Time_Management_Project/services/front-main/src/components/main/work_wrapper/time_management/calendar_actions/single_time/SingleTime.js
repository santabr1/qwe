import React from 'react'
import * as style from '../../time_management.module.css'
import {timeStringFormat} from "../../../../../utils/formats";


export default function SingleTime({startTime, endTime, comment, taskTitle, status, onDelete, onUpdateStatus, isSameDeveloper}) {

    let color = status === 1
        ? 'olivedrab'
        : status === 2
            ? 'coral'
            : 'goldenrod'

    return <div className={style.wt_container} style={{backgroundColor: color}}>
            <div className={style.time_container}>
                <span>{timeStringFormat(startTime)} - {timeStringFormat(endTime)}</span>
            </div>
            <p className={style.comment}>
                {comment && comment.length > 0 ? comment : 'No comment'}
            </p>
            <p className={style.comment}>
                Task: {taskTitle}
            </p>
            <button className='primary-btn' onClick={onDelete}>
                Delete
            </button>
            <div className={style.wt_item_container}>
                {
                    !isSameDeveloper() && (status === 0 || status === 2) && <button className='primary-btn' onClick={() => onUpdateStatus(1)}>
                        Confirm
                    </button>
                }
                {
                    !isSameDeveloper() && (status === 0 || status === 1) && <button className='primary-btn' onClick={() => onUpdateStatus(2)}>
                        Reject
                    </button>
                }
            </div>
        </div>
}