import React, {useEffect} from 'react'
import Notifications from './Notifications'

export default function NotificationsSide(props) {
    const {
        accessRights,
        notificationsList,
        totalNotificationsCount,
        paginationSize,
        deleteNotification,
        getNotifications,
        getNotificationsCount,
        updateNotification,
        history,
        rootPath,
        page,
        loading,
        setLoading,
        isAdding,
        onSubmitPutNotification,
        setIsAdding
    } = props

    useEffect(() => {
        setLoading(true)

        getNotificationsCount()
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [])

    useEffect(() => {

        history.push(rootPath + '1')
        getNotifications()
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))

    }, [totalNotificationsCount])

    useEffect(() => {
        setLoading(true)

        //Запрос на получение только при валидной странице.
        //Впоследствие произойдет редирект
        if(page >= 1 && page <= totalPagesCount) {

            //Получение уведомлений при изменении страницы
            getNotifications()
                .catch((err) => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [page])

    function deleteNotificationAction(notificationId) {
        setLoading(true)
        return deleteNotification(notificationId)
            .then(() => getNotificationsCount())
            .then(() => getNotifications())
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setLoading(false))
    }

    function updateNotificationActionCreator(notificationId) {
        return content => {
            setLoading(true)
            return updateNotification(notificationId, content)
                .then(() => getNotificationsCount())
                .then(() => getNotifications())
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
                .finally(() => setLoading(false))
        }
    }

    const totalPagesCount = Math.ceil(totalNotificationsCount / paginationSize)

    return <Notifications
        notificationsList={notificationsList}
        totalPagesCount={totalPagesCount}
        loading={loading}
        setLoading={setLoading}
        paginationSize={paginationSize}
        totalNotificationsCount={totalNotificationsCount}
        rootPath={rootPath}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        onSubmitPutNotification={onSubmitPutNotification}
        deleteNotificationAction={deleteNotificationAction}
        updateNotificationActionCreator={updateNotificationActionCreator}
        accessRights={accessRights}
    />
}