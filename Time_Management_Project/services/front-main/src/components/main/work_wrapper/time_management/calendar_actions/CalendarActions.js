import React from 'react'
import * as style from '../time_management.module.css'
import SingleTimeContainer from './single_time/SingleTimeContainer'
import {dateToDateString} from "../../../../utils/formats";
import AddWtFormContainer from "./add_wt_form/AddWtFormContainer";

export default function CalendarActions({wtlist, actualDate, wtDeveloperId, isFormShown, setFromShown, isSameDeveloper, wtIsAdmin}) {
    return <div className={style.cal_act_wrapper}>
        <h1 className={style.date}>{dateToDateString(actualDate)}</h1>
        <div className={style.wt_single_item_wrapper}>
            {
                wtlist.map(wt => <SingleTimeContainer
                    wt={wt}
                    developerId={wtDeveloperId}
                    date={actualDate}
                    isSameDeveloper={isSameDeveloper}
                />)
            }
        </div>
        <button
            className={'primary-btn'}
            onClick={() => setFromShown(!isFormShown)}
        >
            {isFormShown ? 'Close' : 'Add'}
        </button>
        {
            isFormShown && <AddWtFormContainer
                developerId={wtDeveloperId}
                actualDate={actualDate}
                wtIsAdmin={wtIsAdmin}
            />
        }
    </div>
}