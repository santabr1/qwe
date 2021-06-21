
/*
    ************************
    * Объект построения SQL
    * запросов для работы
    * с РАЗРАБОТЧИКАМИ
    * **********************
 */

const developersQueries = {
    getDevelopersBySurnameAndMail(email, surname, actualPage, pagSize) {
        return `
                SELECT  * 
                  FROM  developers 
                 WHERE  developer_email LIKE ${email} AND
                        developer_surname LIKE ${surname}
                ORDER BY    developer_surname
                LIMIT   ${actualPage * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersBySurname(surname, actualPage, pagSize) {
        return `
                    SELECT  * 
                      FROM  developers 
                     WHERE  developer_surname LIKE ${surname}
                    ORDER BY    developer_surname
                    LIMIT   ${actualPage * pagSize}, ${pagSize}
                    ;
                `
    },
    getDevelopersByEmail(email, actualPage, pagSize) {
        return `
                    SELECT  * 
                      FROM  developers 
                     WHERE  developer_email LIKE ${email}
                    ORDER BY    developer_surname
                    LIMIT   ${actualPage * pagSize}, ${pagSize}
                    ;
                `
    },
    getAllDevelopers(actualPage, pagSize) {
        return `
                    SELECT  * 
                      FROM  developers
                    ORDER BY    developer_surname
                    LIMIT   ${actualPage * pagSize}, ${pagSize}
                    ;
                `
    },
    getDeveloperById(id) {
        return `
                    SELECT  * 
                      FROM  developers 
                     WHERE  developer_id = ${id}
                    ;
                `
    },
    updateSurface(id, name, surname, patronymic, birth, email) {
        return `
                    UPDATE  developers
                    SET     developer_name = ${name},
                            developer_surname = ${surname},
                            developer_patronymic = ${patronymic},
                            developer_birth = ${birth},
                            developer_email = ${email}
                   WHERE    developer_id = ${id}
                   ;
                `
    },
    updateDeep(id, name, surname, patronymic, birth, email, position, specialty, isAdmin) {
        return `
                    UPDATE  developers
                    SET     developer_name = ${name},
                            developer_surname = ${surname},
                            developer_patronymic = ${patronymic},
                            developer_birth = ${birth},
                            developer_email = ${email},
                            developer_position = ${position},
                            developer_specialty = ${specialty},
                            developer_is_admin = ${isAdmin}
                   WHERE    developer_id = ${id}
                   ;
                `
    },
    deleteById(id) {
        return `
            DELETE FROM developers
            WHERE       developer_id = ${id}
            ;
        `
    },
    put(name, surname, patronymic, birth, email, position, specialty, isAdmin, password) {
        return `
                INSERT INTO developers (
                        developer_name, 
                        developer_surname, 
                        developer_patronymic, 
                        developer_birth,
                        developer_email,
                        developer_position,
                        developer_specialty,
                        developer_is_admin,
                        developer_password
                   )
                   VALUES (
                        ${name},
                        ${surname},
                        ${patronymic},
                        ${birth},
                        ${email},
                        ${position},
                        ${specialty},
                        ${isAdmin},
                        ${password}
                   )
               ;
            `
    },

    countByEmailAndSurname(email, surname) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers 
                 WHERE  developer_email LIKE ${email} AND 
                        developer_surname LIKE ${surname}
                ;
            `
    },
    countByEmail(email) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers 
                 WHERE  developer_email LIKE ${email}
                ;
            `
    },
    countBySurname(surname) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers 
                 WHERE  developer_surname LIKE ${surname}
                ;
            `
    },
    countAll() {
        return `
                SELECT  COUNT(*)
                  FROM  developers
                ;
            `
    },
    checkEmail(email, id) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers 
                 WHERE  developer_email = ${email} AND 
                        developer_id <> ${id}
                ;
            `
    },
    checkByDeveloper(email) {
        return `
            SELECT  developer_id 
              FROM  developers
             WHERE  developer_email = ${email} AND 
                    developer_is_admin = 0
            ; 
        `
    },
    changeAvatarById(id, avatarURL) {
        return `
                UPDATE  developers
                   SET  developer_avatar_url = ${avatarURL}
                 WHERE  developer_id = ${id}
                ;
            `
    },
    getSpecialty(id) {
        return `
                SELECT  specialty_value 
                  FROM  developers_specialty 
                 WHERE  specialty_id = ${id}
                ;
            `
    },
    getPosition(id) {
        return `
                SELECT  position_value 
                  FROM  developers_position 
                 WHERE  position_id = ${id}
                ;
            `
    },
    getDevelopersInTask(taskId, page, pagSize) {
        return `
                SELECT  * 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  )
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInTaskBySurname(taskId, page, pagSize, surname) {
        return `
                SELECT  * 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        D.developer_surname LIKE ${surname}
                  ORDER BY  developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInTaskByEmail(taskId, page, pagSize, email) {
        return `
                SELECT  * 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        developer_email LIKE ${email}
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInTaskBySurnameAndEmail(taskId, page, pagSize, surname, email) {
        return `
                SELECT  * 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT DT.developer_id
                          FROM developers_tasks DT
                         WHERE DT.task_id = ${taskId}
                  ) AND
                        D.developer_email LIKE ${email}
                        D.developer_surname LIKE ${surname}
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersCountInTask(taskId) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  )
                ;
            `
    },
    checkDeveloperInTask(taskId, developerId) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        D.developer_id = ${developerId}
                ;
            `
    },
    getDevelopersCountInTaskBySurname(taskId, surname) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        D.developer_surname LIKE ${surname}
                ;
            `
    },
    getDevelopersCountInTaskByEmail(taskId, email) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        D.developer_email LIKE ${email}
                ;
            `
    },
    getDevelopersCountInTaskBySurnameAndEmail(taskId, surname, email) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id = ${taskId}
                  ) AND
                        D.developer_email LIKE ${email}
                        D.developer_surname LIKE ${surname}
                ;
            `
    },
    getDevelopersCountInProject(projectId) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  )
                ;
            `
    },
    getDevelopersCountInProjectBySurname(projectId, surname) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_surname LIKE ${surname}
                ;
            `
    },

    getDevelopersCountInProjectByEmail(projectId, email) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_email LIKE ${email}
                ;
            `
    },

    getDevelopersCountInProjectBySurnameAndEmail(projectId, email, surname) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_surname LIKE ${surname} AND
                        D.developer_email LIKE ${email}
                ;
            `
    },

    getDevelopersInProject(projectId, page, pagSize) {
        return `
                SELECT  D.* 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  )
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    checkDeveloperInProject(projectId, developerId, page, pagSize) {
        return `
                SELECT  COUNT(*) 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_id = ${developerId}
                  ORDER BY  developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInProjectByEmail(projectId, page, pagSize, email) {
        return `
                SELECT  D.* 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_email LIKE ${email}
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInProjectBySurname(projectId, page, pagSize, surname) {
        return `
                SELECT  D.* 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_surname LIKE ${surname}
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getDevelopersInProjectByEmailAndSurname(projectId, page, pagSize, surname, email) {
        return `
                SELECT  D.* 
                  FROM  developers D
                 WHERE  D.developer_id IN (
                        SELECT  DT.developer_id
                          FROM  developers_tasks DT
                         WHERE  DT.task_id IN (
                            SELECT  T.task_id 
                              FROM  tasks T
                             WHERE  T.project_id = ${projectId}
                        )
                  ) AND
                        D.developer_surname LIKE ${surname} AND
                        D.developer_email LIKE ${email}
                  ORDER BY  D.developer_surname
                     LIMIT  ${page * pagSize}, ${pagSize}
                ;
            `
    },

    getAuth(email) {
        return `
                SELECT  developer_id,
                        developer_is_admin,
                        developer_password
                  FROM  developers
                 WHERE  developer_email = ${email}
                ;
            `
    },

    getSubordinate(developerId, isAdmin) {
        if(isAdmin === 'true')
            return `
                 select  d.developer_id as developerId,
                         concat(d.developer_name,' ',d.developer_surname) as developerFullName,
                         d.developer_is_admin as isAdmin
                   from  developers d
                 ;
            `
        else
            return `
                select  d.developer_id as developerId,
                        concat(d.developer_name,' ',d.developer_surname) as developerFullName,
                        d.developer_is_admin as isAdmin
                  from  developers d
                  left join developers_tasks dt
                        on dt.developer_id = d.developer_id
                  left join tasks t
                        on t.task_id = dt.task_id
                  left join projects p
                        on p.project_id = t.project_id
                  where t.task_lead_id = ${developerId} or
                        p.project_lead_id = ${developerId}
                ;
            `
    }
}

module.exports = developersQueries