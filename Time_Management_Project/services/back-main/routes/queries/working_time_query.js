const workingTimeQuery = {
    getByDate(developerId, date) {
        return `
            select  wt.working_time_id as id,
                    wt.start_time as startTime,
                    wt.end_time as endTime,
                    wt.developer_id as developerId,
                    wt.task_id as taskId,
                    wt.working_time_comment as comment,
                    wt.working_time_status as status,
                    t.task_title as taskTitle
              from  working_time wt
              left join tasks t
                on t.task_id = wt.task_id
             where  cast(wt.start_time as date) = ${date} and
                    cast(wt.end_time as date) = ${date} and
                    wt.developer_id = ${developerId}
            ;
        
        `
    },

    addWt(developerId, taskId, startTime, endTime, wtComment) {
        return `
            insert into working_time (
                start_time,
                end_time,
                developer_id,
                task_id,
                working_time_comment
            ) values (
                ${startTime},
                ${endTime},
                ${developerId},
                ${taskId},
                ${wtComment}
            );
        `
    },

    deleteWt(wtId) {
        return `
            delete 
              from  working_time wt
             where  wt.working_time_id = ${wtId}
        `
    },

    changeStatus(wtId, status) {
        return `
            update  working_time
               set  working_time_status = ${status}
             where  working_time_id = ${wtId}
        `
    },

    getWtForCalendar(developerId, monthNumber, yearNumber) {
        return `
            select  day(wt.start_time) as day,
                    month(wt.start_time) as month,
                    year(wt.start_time) as year,
                    wt.working_time_status as status
              from  working_time wt
             where  month(wt.start_time) = ${monthNumber} and
                    month(wt.end_time) = ${monthNumber} and
                    year(wt.start_time) = ${yearNumber} and
                    year(wt.end_time) = ${yearNumber} and
                    wt.developer_id = ${developerId}
            ;
        `
    }
}


module.exports = workingTimeQuery