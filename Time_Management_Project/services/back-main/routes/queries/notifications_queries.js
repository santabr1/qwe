/*
    ************************
    * Объект построения SQL
    * запросов для работы
    * с УВЕДОМЛЕНИЯМИ
    * **********************
 */

const notificationsQueries = {

    getNotificationsByTaskId(taskId, page, pagSize) {
        return `
                SELECT  *
                  FROM  notifications
                  WHERE task_id = ${taskId} 
                  ORDER BY  notif_date DESC
                  LIMIT ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getNotificationsByDeveloperId(developerId, page, pagSize) {
        return `
                SELECT  N.*
                  FROM  notifications N
                 WHERE  N.task_id in (
                        SELECT  DT.task_id 
                          FROM  developers_tasks DT
                         WHERE  DT.developer_id = ${developerId} OR
                                ${developerId} = (
                                        SELECT  T.task_lead_id
                                          FROM  tasks T
                                         WHERE  T.task_id = DT.task_id
                                    ) OR
                                    ${developerId} = (
                                        SELECT  P.project_lead_id
                                          FROM  projects P
                                         WHERE  P.project_id = (
                                                SELECT T.project_id
                                                  FROM tasks T
                                                 WHERE T.task_id = DT.task_id
                                         )
                                )
                    )
                ORDER BY  N.notif_date DESC
                LIMIT ${page * pagSize}, ${pagSize}
                ;
        
            `
    },
    getNotificationsCountByDeveloperId(developerId) {
        return `
                SELECT  COUNT(*)
                  FROM  notifications N
                 WHERE  N.task_id in (
                        SELECT  DT.task_id 
                          FROM  developers_tasks DT
                        WHERE   DT.developer_id = ${developerId} OR
                                ${developerId} = (
                                        SELECT  T.task_lead_id
                                          FROM  tasks T
                                         WHERE  T.task_id = DT.task_id
                                    ) OR
                                    ${developerId} = (
                                        SELECT  P.project_lead_id
                                          FROM  projects P
                                         WHERE  P.project_id = (
                                                SELECT  T.project_id
                                                  FROM  tasks T
                                                 WHERE  T.task_id = DT.task_id
                                         )
                                )
                    )
                ;
            `
    },

    getNotificationsCountByTaskId(taskId) {
        return `
                SELECT COUNT(*)
                  FROM notifications
                 WHERE task_id = ${taskId}
                ;
            `
    },
    getAllNotifications(page, pagSize) {
        return `
                SELECT  *
                  FROM  notifications 
                ORDER BY  notif_date DESC
                LIMIT ${page * pagSize}, ${pagSize}
                ;
            `
    },
    getAllNotificationsCount() {
        return `
                SELECT COUNT(*)
                  FROM notifications
                ;
            `
    },
    deleteNotification(notificationId) {
        return `
                DELETE FROM notifications
                      WHERE notif_id = ${notificationId}     
                ;
            `
    },
    putNotification(sender, content, date, taskId) {
        return `
                INSERT INTO notifications(
                        notif_sender,
                        notif_content,
                        notif_date,
                        task_id
                    )
                    VALUES(
                        ${sender},
                        ${content},
                        ${date},
                        ${taskId}
                    )
                ;
            `

    },
    updateNotification(notificationId, content) {
        return `
                UPDATE notifications
                   SET notif_content = ${content}
                 WHERE notif_id = ${notificationId}
                ;
            `
    },
    checkByUnique(sender, content) {
        return `
                SELECT  COUNT(*)
                FROM    notifications
                WHERE   notif_sender = ${sender} AND 
                        notif_content = ${content}
                ;
            `
    }
}

module.exports = notificationsQueries