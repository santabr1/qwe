import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import * as style from './time_management.module.css'
import CalendarActionsContainer from "./calendar_actions/CalendarActionsContainer";

export default function TimeManagement({
                                           actualDate,
                                           setActualDate,
                                           onClickOnDate,
                                           wtDeveloperId,
                                           isSameDeveloper,
                                           setWtDeveloperId,
                                           subordinates,
                                           wtIsAdmin,
                                           setWtIsAdmin,
                                           onClickOnDeveloper,
                                           setFromShown,
                                           isFormShown
                                       }) {


    return <div className={style.tm_main_wrapper}>
        <div>
            <Calendar
                value={actualDate}
                onChange={setActualDate}
                className={style.cal}
                onClickDay={onClickOnDate}
            />
            {
                subordinates.length > 0 && <select
                    className={style.developer_select}
                    name="tasks"
                    style={{display: 'block'}}
                    value={wtDeveloperId}
                    onChange={onClickOnDeveloper}
                    placeholder={'Enter task'}
                >
                    <option value="" selected disabled>Select developer...</option>
                    {
                        subordinates.map(s => <option
                            value={s.developerId}
                            label={s.developerFullName}
                            key={s.developerId}
                            data-admin={s.isAdmin}
                        />)
                    }
                </select>
            }
        </div>
        <CalendarActionsContainer
            actualDate={actualDate}
            wtDeveloperId={wtDeveloperId}
            isSameDeveloper={isSameDeveloper}
            wtIsAdmin={wtIsAdmin}
            setFromShown={setFromShown}
            isFormShown={isFormShown}
        />
    </div>
}