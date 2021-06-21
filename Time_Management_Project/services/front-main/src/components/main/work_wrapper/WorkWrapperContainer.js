import {connect} from 'react-redux'
import WorkWrapper from './WorkWrapperWithSide'
import * as selectors from '../../../redux/selectors'
import {
    putProject,
    getProjectById,
    deleteProject,
    changeProject
} from '../../../redux/reducers/projects_reducer'

import {putDeveloper} from '../../../redux/reducers/developers_reducer'
import {putTask} from "../../../redux/reducers/tasks_reducer";


function mapStateToProps(state) {
    return {
        isAdmin: selectors.isAdminSelector(state),
        actualProject: selectors.actualProjectSelector(state),
        authId: selectors.authIdSelector(state)
    }
}

export default connect(mapStateToProps, {
    putProject,
    getProjectById,
    deleteProject,
    changeProject,
    putTask,
    putDeveloper
})(WorkWrapper)