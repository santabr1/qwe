import {connect} from 'react-redux'
import React from 'react'
import Projects from './ProjectsSide'
import * as selectors from '../../../../../redux/selectors'
import {
    getProjects,
    getProjectsCount,
    getDevelopersProjects,
    getDevelopersProjectsCount
} from '../../../../../redux/reducers/projects_reducer'


function ProjectMiddleWare(props) {

    const getProjects = props.isAdmin
        ? props.getProjects
        : (page, title) => props.getDevelopersProjects(page, title, props.authId)

    const getProjectsCount = props.isAdmin
        ? props.getProjectsCount
        : (title) => props.getDevelopersProjectsCount(title, props.authId)

    return <Projects
        projectsList={props.projectsList}
        totalCount={props.totalCount}
        pagSize={props.pagSize}
        actualProject={props.actualProject}
        isAdmin={props.isAdmin}
        getProjects={getProjects}
        getProjectsCount={getProjectsCount}
    />
}

function mapStateToProps(state) {
    return {
        projectsList: selectors.projectsListSelector(state),
        totalCount: selectors.totalProjectsCountSelector(state),
        pagSize: selectors.projectsPaginationSizeSelector(state),
        actualProject: selectors.actualProjectSelector(state),
        isAdmin: selectors.isAdminSelector(state),
        authId: selectors.authIdSelector(state)
    }
}

export default connect(mapStateToProps, {

    getProjects,
    getProjectsCount,
    getDevelopersProjects,
    getDevelopersProjectsCount

})(ProjectMiddleWare)