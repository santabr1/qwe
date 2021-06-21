import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import NotificationsSide from "./NotificationsSide";

function AllNotificationsSide(props) {
    const {
        accessRights,
        notificationsList,
        totalNotificationsCount,
        paginationSize,
        deleteNotification,
        getAllNotifications,
        getAllNotificationsCount,
        putNotification,
        updateNotification,
        match,
        location,
        history,
        getNotificationsCountByDeveloperId,
        getNotificationsByDeveloperId,
        getNotificationsByTaskId,
        getNotificationsCountByTaskId,
        authId,
        rootPath,
        taskId
    } = props
    let page = match.params.page ? +match.params.page : 1

    const [loading, setLoading] = useState(false)

    return <NotificationsSide
        accessRights={accessRights}
        notificationsList={notificationsList}
        totalNotificationsCount={totalNotificationsCount}
        paginationSize={paginationSize}
        deleteNotification={deleteNotification}
        getNotifications={
            accessRights
                ? () => getAllNotifications(page)
                : taskId
                ? () => getNotificationsByTaskId(taskId, page)
                : () => getNotificationsByDeveloperId(authId, page)
        }
        getNotificationsCount={
            accessRights
                ? () => getAllNotificationsCount(page)
                : taskId
                ? () => getNotificationsCountByTaskId(taskId)
                : () => getNotificationsCountByDeveloperId(authId, page)
        }
        putNotification={putNotification}
        updateNotification={updateNotification}
        match={match}
        location={location}
        history={history}
        rootPath={rootPath}
        page={page}
        loading={loading}
        setLoading={setLoading}
    />
}

export default withRouter(AllNotificationsSide)