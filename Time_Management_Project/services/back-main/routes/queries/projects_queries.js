/*
    ************************
    * Объект построения SQL
    * запросов для работы
    * с ПРОЕКТАМИ
    * **********************
 */

const projects_queries = {
    getAll(page, pageSize) {
        return `
                SELECT  * 
                  FROM  projects
                ORDER BY    project_deadline
                LIMIT   ${page * pageSize}, ${pageSize}
                ;
            `
    },
    getAllByTitle(title, page, pageSize) {
        return `
                SELECT * 
                  FROM  projects
                 WHERE  project_title LIKE ${title}
                ORDER BY    project_deadline
                LIMIT       ${page * pageSize}, ${pageSize}
                ;
            `
    },

    getById(id) {
        return `
            SELECT  * 
              FROM  projects
             WHERE  project_id = ${id}
            ;
        `
    },

    getDevelopersProjects(developerId, page, pagSize) {
        return `
            SELECT P.* 
            FROM projects P
            WHERE (P.project_id IN (
                SELECT  T.project_id
                  FROM  tasks T
                 WHERE  T.task_id in (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  DT.developer_id = ${developerId}
                    ) or T.task_lead_id = ${developerId}
            ) or P.project_lead_id = ${developerId})
            LIMIT ${page * pagSize}, ${pagSize}
            ;
        `
    },
    getDevelopersProjectsCount(developerId) {
        return `
            SELECT  COUNT(*) 
            FROM    projects P
            WHERE   (P.project_id IN (
                SELECT T.project_id
                  FROM tasks T
                 WHERE T.task_id IN (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  DT.developer_id = ${developerId}
                ) or T.task_lead_id = ${developerId}
            ) or P.project_lead_id = ${developerId})
            ;
        `
    },
    getDevelopersProjectsByTitle(developerId, title, page, pagSize) {
        return `
            SELECT P.* 
            FROM projects P
            WHERE (P.project_id IN (
                SELECT  T.project_id
                  FROM  tasks T
                 WHERE  T.task_id in (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  DT.developer_id = ${developerId}
                    )
            ) or P.project_lead_id = ${developerId}) AND
                P.project_title LIKE ${title}
            LIMIT ${page * pagSize}, ${pagSize}
            ;
        `
    },
    getDevelopersProjectsCountByTitle(developerId, title) {
        return `
            SELECT COUNT(*) 
            FROM projects P
            WHERE (P.project_id IN (
                SELECT  T.project_id
                  FROM  tasks T
                 WHERE  T.task_id in (
                    SELECT  DT.task_id
                      FROM  developers_tasks DT
                     WHERE  DT.developer_id = ${developerId}
                    )
            ) or P.project_lead_id = ${developerId}) AND
                P.project_title LIKE ${title}
            ;
        `
    },

    getAllCount() {
        return `
                SELECT  COUNT(*) 
                  FROM  projects
                ;
            `
    },
    getCountByTitle(title) {
        return `
                SELECT  COUNT(*) 
                  FROM  projects
                 WHERE  project_title LIKE ${title}
                ;
            `
    },
    checkByLead(developerId) {
        return `
            SELECT  COUNT(*) 
              FROM  projects
             WHERE  project_lead_id = ${developerId}
            ;
        `
    },
    putProject(title, description, deadline, projectLeadId) {
        return `
            INSERT INTO projects (
                    project_title,
                    project_description,
                    project_deadline,
                    project_lead_id
                )
                VALUES (
                    ${title}, 
                    ${description},
                    ${deadline},
                    ${projectLeadId}
                )
            ;
        `
    },
    deleteProject(id) {
        return `
                DELETE FROM projects
                WHERE       project_id = ${id}
                ;
            `
    },
    updateProject(id, title, description, deadline, projectLeadId) {
        return `
                UPDATE  projects
                SET     project_title = ${title},
                        project_description = ${description},
                        project_deadline = ${deadline},
                        project_lead_id = ${projectLeadId}
                WHERE   project_id = ${id}
                ;
            `
    }
}

module.exports = projects_queries