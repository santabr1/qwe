import React from 'react'
import Pagination from '../../../utils_components/pagination/Pagination'
import Loader from '../../../utils_components/Loader'
import SingleNotification from './single_notification/SingleNotification'
import AddNotificationForm from './add_notification_form/AddNotificationForm'
import * as style from './notifications.module.css'

export default function Notification(props) {
    const {
        totalPagesCount,
        notificationsList,
        paginationSize,
        totalNotificationsCount,
        rootPath,
        loading,
        isAdding,
        setIsAdding,
        onSubmitPutNotification,
        deleteNotificationAction,
        updateNotificationActionCreator,
        accessRights
    } = props

    if(loading)
        return <Loader/>

    return (
        <div className={style.all_notifications_wrapper}>
            {
                //Если не приходит функция submit => невозможно работать с формой
                //В случае, если идет работа без задач (вывести все уведомления) будет невозможно добавить уведомление
                onSubmitPutNotification && accessRights
                    ? <>
                        <button
                            className='primary-btn'
                            onClick={() => setIsAdding(!isAdding)}> {isAdding ? 'Back' : 'Add notification'}
                        </button>
                        {
                            isAdding
                                ? <AddNotificationForm
                                    onSubmitPutNotification={onSubmitPutNotification}
                                />
                                : null
                        }
                    </>
                    : null
            }

            {
                notificationsList.map(notif => <SingleNotification
                    accessRights={accessRights}
                    sender={notif.notif_sender}
                    content={notif.notif_content}
                    date={notif.notif_date}
                    deleteNotificationAction={() => deleteNotificationAction(notif.notif_id)}
                    updateNotification={updateNotificationActionCreator(notif.notif_id)}
                />)
            }
            {
                totalPagesCount > 1
                    ? <Pagination
                        paginationSize={paginationSize}
                        totalCount={totalNotificationsCount}
                        rootValue={rootPath}
                    />
                    : null
            }
        </div>
    )
}