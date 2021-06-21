import {connect} from 'react-redux'
import Tasks from './Tasks'
import * as selectors from '../../../../../../redux/selectors/index'
import {
    deleteTask,
    getSingleTask,
    getTasks,
    getTotalTasksCount,
    updateTask,
    deleteChangingDate,
    getChangingDates,
    putChangingDate,
    updateChangingDate,
    getDevelopersTasks,
    getTotalDevelopersTasksCount
} from '../../../../../../redux/reducers/tasks_reducer'

function mapStateToProps(state) {
    return {
        totalTasksCount: selectors.totalTasksCountSelector(state),
        tasksList: selectors.tasksListSelector(state),
        tasksPagSize: selectors.tasksPaginationSizeSelector(state),
        actualTask: selectors.actualTaskSelector(state),
        authId: selectors.authIdSelector(state),
        changingDatesList: selectors.changingDatesListSelector(state)
    }
}

export default connect(mapStateToProps, {
    getTotalTasksCount,
    deleteTask,
    getSingleTask,
    getTasks,
    updateTask,
    deleteChangingDate,
    getChangingDates,
    putChangingDate,
    updateChangingDate,
    getDevelopersTasks,
    getTotalDevelopersTasksCount
})(Tasks)