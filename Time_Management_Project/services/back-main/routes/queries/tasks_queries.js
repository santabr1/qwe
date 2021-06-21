/*
    ************************
    * Объект построения SQL
    * запросов для работы
    * с ЗАДАЧАМИ
    * **********************
 */

const tasksQueries = {
    getAllByProjectId(projectId, page, pageSize) {
        return `
                SELECT  *
                  FROM  tasks
                 WHERE  project_id = ${projectId}
                 LIMIT  ${page * pageSize}, ${pageSize}
                ;
            `
    },
    getByTitle(projectId, title, page, pageSize) {
        return `
                SELECT  *
                  FROM  tasks
                 WHERE  project_id = ${projectId} AND 
                        task_title LIKE ${title}
                 LIMIT  ${page * pageSize}, ${pageSize}
                ;
            `
    },
    getDevelopersTasksByTitle(developerId, projectId, title, page, pageSize) {
        return `
            SELECT  T.*
              FROM  tasks T
             WHERE  (T.task_id IN (
                    SELECT DT.task_id
                      FROM developers_tasks DT
                     WHERE developer_id = ${developerId}
                ) OR T.task_lead_id = ${developerId}) AND
                    T.task_title LIKE ${title} AND
                    T.project_id = ${projectId}
             LIMIT ${page * pageSize}, ${pageSize}
            ;
        `
    },
    getDevelopersTasksCountByTitle(developerId, projectId, title) {
        return `
            SELECT  COUNT(*)
              FROM  tasks T
             WHERE  (T.task_id IN (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  developer_id = ${developerId}
                ) OR T.task_lead_id = ${developerId}) AND
                    T.task_title LIKE ${title} AND
                    T.project_id = ${projectId}
            ;
        `
    },
    getDevelopersTasks(developerId, projectId, page, pageSize) {
        return `
            SELECT  *
              FROM  tasks T
             WHERE  (T.task_id in (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  developer_id = ${developerId}
                ) OR T.task_lead_id = ${developerId}) AND
                    T.project_id = ${projectId}
                LIMIT ${page * pageSize}, ${pageSize}
            ;
        `
    },
    getDevelopersTasksCount(developerId, projectId) {
        return `
            SELECT  COUNT(*)
              FROM  tasks T
             WHERE  (T.task_id in (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  developer_id = ${developerId}
                ) OR T.task_lead_id = ${developerId}) AND
                    T.project_id = ${projectId}
            ;
        `
    },

    getById(taskId) {
        return `
                SELECT  *
                  FROM  tasks
                 WHERE  task_id = ${taskId}
                ;
            `
    },
    getAllCount(projectId) {
        return `
                SELECT  COUNT(*)
                  FROM  tasks
                 WHERE  project_id = ${projectId}
                ;
            `
    },
    getCountByTitle(projectId, title) {
        return `
                SELECT  COUNT(*)
                  FROM  tasks
                 WHERE  project_id = ${projectId} AND 
                        task_title LIKE ${title}
                ;
            `
    },
    put(title, description, results, actualDeadline, plannedDeadline, leadId, projectId) {
        return `
                INSERT INTO tasks (
                        task_title,
                        task_description,
                        task_results,
                        task_actual_deadline,
                        task_planned_deadline,
                        task_lead_id,
                        project_id
                    )
                    VALUES (
                        ${title},
                        ${description},
                        ${results},
                        ${actualDeadline},
                        ${plannedDeadline},
                        ${leadId},
                        ${projectId}
                    )
                ;
            `
    },
    update(taskId, title, description, results, leadId) {
        return `
                UPDATE tasks
                    SET task_title = ${title},
                        task_description = ${description},
                        task_results = ${results},
                        task_lead_id = ${leadId}
                    WHERE task_id = ${taskId}
                ;
            `
    },
    delete(taskId) {
        return `
                DELETE FROM tasks
                    WHERE   task_id = ${taskId}
                ;
            `
    },
    updateActualDeadline(taskId, actualDeadline) {
        return `
                UPDATE  tasks
                   SET  task_actual_deadline = ${actualDeadline}
                 WHERE  task_id = ${taskId}
                ;
            `
    },

    addDeveloperToTask(developerId, taskId) {
        return `
                INSERT INTO developers_tasks(
                        developer_id,
                        task_id
                    ) 
                    VALUES (
                        ${developerId},
                        ${taskId}
                    )
                ;       
            `
    },

    deleteDeveloperFromTask(developerId, taskId) {
        return `
                DELETE FROM developers_tasks
                WHERE   developer_id = ${developerId} AND
                        task_id = ${taskId}
                ;
            `
    },

    getDyingTasks(stringTime) {
        return `
                SELECT  * 
                  FROM  tasks
                 WHERE  task_actual_deadline <= DATE_ADD(${stringTime}, INTERVAL 1 DAY)
                ;
            `
    },

    getDeadTasks(stringTime) {
        return `
                SELECT  * 
                  FROM  tasks
                 WHERE  task_actual_deadline >= ${stringTime} AND
                        task_actual_deadline <= DATE_ADD(${stringTime}, INTERVAL -1 DAY)
                ;
            `
    },

    getAllDevelopersTasks(developerId) {
        return `
            select  t.task_id,
                    t.task_title
                  from  developers d
                  left join developers_tasks dt
                    on dt.developer_id = d.developer_id
                  left join tasks t
                    on t.task_id = dt.task_id
                 where  d.developer_id = ${developerId}
                ;
        `
    },

    getAll() {
        return `
            select  *
              from  tasks
            ;
        `
    }
}

module.exports = tasksQueries