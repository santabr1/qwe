export const authIdSelector = (state) => state.auth.authId

export const isAdminSelector = (state) => state.auth.isAdmin

export const totalNotificationsCountSelector = (state) => state.notifications.totalNotificationsCount

export const notificationsListSelector = (state) => state.notifications.notificationsList

export const notificationsPaginationSize = (state) => state.notifications.paginationSize

//Селекторы разработчиков
export const positionCodesSelector = (state) => state.developers.positionCodes

export const specialtyCodesSelector = (state) => state.developers.specialtyCodes

export const totalDevelopersCountSelector = (state) => state.developers.totalDevelopersCount

export const paginationSizeDevelopersSelector = (state) => state.developers.paginationSize

export const developersListSelector = (state) => state.developers.developersList

//Селекторы профиля
export const profileInformationSelector = (state) => state.profile.profileInformation


//Селекторы проектов
export const actualProjectSelector = (state) => state.projects.actualProject

export const projectsListSelector = (state) => state.projects.projectsList

export const projectsPaginationSizeSelector = (state) => state.projects.paginationSize

export const totalProjectsCountSelector = (state) => state.projects.totalProjectsCount


//Селекторы задач
export const tasksListSelector = (state) => state.tasks.tasksList

export const actualTaskSelector = (state) => state.tasks.actualTask

export const tasksPaginationSizeSelector = (state) => state.tasks.paginationSize

export const totalTasksCountSelector = (state) => state.tasks.totalTasksCount

export const changingDatesListSelector = (state) => state.tasks.changingDatesList

//Селекторы ачивок
export const achListSelector = (state) => state.ach.achList


//Селекторы рабочего времени
export const workingTimeListSelector = (state) => {
    return state.wt.workingTimeList
}
