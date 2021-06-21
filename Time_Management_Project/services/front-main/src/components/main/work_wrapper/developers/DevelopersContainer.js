import {connect} from 'react-redux'
import Developers from './DevelopersSide'
import * as selectors from '../../../../redux/selectors/index'
import {getDevelopers, getTotalCount} from '../../../../redux/reducers/developers_reducer'
import React from 'react'
import {NavLink} from 'react-router-dom'


function DevelopersContainer(props) {
    return <Developers
        {...props}
        AddDeveloper={() => <NavLink to='/put-developer' className='primary-btn'>Add&nbsp;new&nbsp;developer</NavLink>}
    />
}

function mapStateToProps(state) {
    return {
        totalDevelopersCount: selectors.totalDevelopersCountSelector(state),
        paginationSize: selectors.paginationSizeDevelopersSelector(state),
        developersList: selectors.developersListSelector(state),
        rootPath: '/developers/',
        accessRights: selectors.isAdminSelector(state)
    }
}
export default connect(mapStateToProps, {

    getDevelopers,
    getTotalCount

})(DevelopersContainer)