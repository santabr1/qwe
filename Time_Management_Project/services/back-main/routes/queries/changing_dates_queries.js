/*
    ************************
    * Объект построения SQL
    * запросов для работы
    * с ИЗМЕНЕНИЯМИ ДАТ РЕЛИЗОВ
    * **********************
 */

const changingDatesQueries = {
    getAll(taskId) {
        return `
                SELECT  * 
                  FROM  changing_dates
                 WHERE  changing_date_task_id = ${taskId}
                ;
            `
    },
    putChangingDate(cause, deadlineBefore, deadlineAfter, taskId) {
        return `
                INSERT INTO changing_dates(
                        changing_date_cause,
                        changing_date_deadline_before,
                        changing_date_deadline_after,
                        changing_date_task_id
                    )
                    VALUES (
                        ${cause},
                        ${deadlineBefore},
                        ${deadlineAfter},
                        ${taskId}
                    )
                ;
            `
    },
    deleteChangingDate(changingDateId) {
        return `
                DELETE FROM changing_dates
                      WHERE changing_date_id = ${changingDateId}
                ;
            `
    },
    updateChangingDate(changingDateId, cause) {
        return `
                UPDATE      changing_dates
                    SET     changing_date_cause = ${cause}
                    WHERE   changing_date_id = ${changingDateId}
                ;
            `
    }
}

module.exports = changingDatesQueries