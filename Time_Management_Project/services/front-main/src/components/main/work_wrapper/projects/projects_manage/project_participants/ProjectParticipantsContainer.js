import {connect} from 'react-redux'
import DevelopersSide from '../../../developers/DevelopersSide'
import * as selectors from '../../../../../../redux/selectors'
import {getDevelopersByProject, getCountByProject} from '../../../../../../redux/reducers/developers_reducer'
import React from 'react'
import {withRouter} from 'react-router-dom'


function ProjectParticipantsContainer(props) {

    const actualProjectId = props.match.params.id
    const {
        totalDevelopersCount,
        paginationSize,
        developersList,
        getDevelopersByProject,
        getCountByProject
    } = props

    return <DevelopersSide
        totalDevelopersCount={totalDevelopersCount}
        paginationSize={paginationSize}
        developersList={developersList}
        getDevelopers={(page, email, surname) => getDevelopersByProject(actualProjectId, page, email, surname)}
        getTotalCount={(email, surname) => getCountByProject(actualProjectId, email, surname)}
        AddDeveloper={() => null}
        rootPath={`/single_project/${actualProjectId}/project_participants/`}
    />
}

function mapStateToProps(state) {
    return {
        totalDevelopersCount: selectors.totalDevelopersCountSelector(state),
        paginationSize: selectors.paginationSizeDevelopersSelector(state),
        developersList: selectors.developersListSelector(state)
    }
}
export default connect(mapStateToProps, {

    getDevelopersByProject,
    getCountByProject

})(withRouter(ProjectParticipantsContainer))